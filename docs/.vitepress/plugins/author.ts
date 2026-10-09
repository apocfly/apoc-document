import MarkdownIt from "markdown-it";

const pageAuthorDefaults = {
    root: {
        label: '作者'
    },
    en: {
        label: 'Author'
    }
}

type PageAuthorLocale = keyof typeof pageAuthorDefaults
type LocalizedValue = string | string[] | false | Record<string, string | string[] | false>

const escapeHtml = (value: string) =>
    value.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

const getPageAuthorLocale = (relativePath?: string): PageAuthorLocale => {
    const firstSegment = relativePath?.split('/')[0] as PageAuthorLocale | undefined

    return firstSegment && firstSegment in pageAuthorDefaults ? firstSegment : 'root'
}

const getLocalizedValue = (
    value: LocalizedValue | undefined,
    locale: PageAuthorLocale,
    fallback: string | string[] | false
) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value[locale] ?? value.root ?? fallback
    }

    return value ?? fallback
}

// MathJax 输出的 SVG 属性为小写 viewbox，需归一化为 viewBox；
// 此处必须 return，否则数学渲染器返回 undefined，公式会渲染成字面文本 "undefined"
const normalizeMathSvg = (value: string) => value.replace(/viewbox=/g, 'viewBox=')

export const authorPlugin = (md: MarkdownIt) => {
    const renderInlineMath = md.renderer.rules.math_inline
    const renderBlockMath = md.renderer.rules.math_block

    md.core.ruler.before('anchor', 'page_author', (state) => {
        const locale = getPageAuthorLocale(state.env.relativePath)
        const defaults = pageAuthorDefaults[locale]
        const author = getLocalizedValue(state.env.frontmatter?.author, locale, false)

        if (!author) {
            return
        }

        const authorText = Array.isArray(author) ? author.join(', ') : String(author)
        const labelText = `${defaults.label}：`

        for (let index = 0; index < state.tokens.length; index++) {
            const token = state.tokens[index]

            if (token.type !== 'heading_open' || token.tag !== 'h1') {
                continue
            }

            const closeTokenIndex = index + 2

            if (state.tokens[closeTokenIndex]?.type !== 'heading_close') {
                return
            }

            token.attrJoin('class', 'has-page-title-meta')

            const authorToken = new state.Token('html_block', '', 0)
            authorToken.content = `<div class="page-title-meta"><span class="page-title-author">${escapeHtml(labelText)}${escapeHtml(authorText)}</span></div>\n`

            state.tokens.splice(closeTokenIndex + 1, 0, authorToken)
            return
        }
    })

    if (renderInlineMath) {
        md.renderer.rules.math_inline = (...args) => normalizeMathSvg(renderInlineMath(...args))
    }

    if (renderBlockMath) {
        md.renderer.rules.math_block = (...args) => normalizeMathSvg(renderBlockMath(...args))
    }
}