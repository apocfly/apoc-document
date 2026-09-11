import type MarkdownIt from 'markdown-it'

// 用哨兵字符代替 | 作分隔符：markdown-it 的 escape 规则会抢先消费 \|，
// 导致 inline 规则拿不到转义信息，哨兵则不会被任何内置规则处理
const SEPARATOR = ''
const PATTERN = new RegExp(`^\\[([^${SEPARATOR}\\[\\]\\\\]*(?:\\\\.[^${SEPARATOR}\\[\\]\\\\]*)*)?${SEPARATOR}((?:[^\\[\\]])+)\\]`)

const unescape = (value: string) =>
    value
        .replace(new RegExp(SEPARATOR, 'g'), '|')
        .replace(/\\([\\\[\]])/g, '$1')
        .trim()

const isEscaped = (src: string, index: number) => src[index - 1] === '\\'

// 表格单元格以 | 分列，且表格解析先于 inline 解析，
// 这里先把 [...|...] 内的分隔符替换为哨兵，避免表格拆分单元格
const rewriteTips = (source: string) => {
    let result = ''
    let index = 0

    while (index < source.length) {
        const char = source[index]

        if (char === '`' || char === '$') {
            const endedAt = source.indexOf(char, index + 1)
            result += endedAt === -1 ? source.slice(index) : source.slice(index, endedAt + 1)
            index = endedAt === -1 ? source.length : endedAt + 1
            continue
        }

        if (char === '[' && !isEscaped(source, index)) {
            const lineEnd = source.indexOf('\n', index)
            const line = lineEnd === -1 ? source.slice(index) : source.slice(index, lineEnd)
            const match = /^\[([^\[\]\\]*(?:\\.[^\[\]\\]*)*)\|((?:\\\||[^\[\]|])+)\]/.exec(line)

            if (match && line.indexOf(']') === match[0].length - 1) {
                result += `[${match[1]}${SEPARATOR}${match[2].replace(/\\\|/g, '|')}]`
                index += match[0].length
                continue
            }
        }

        result += char
        index++
    }

    return result
}

export const tooltipPlugin = (md: MarkdownIt) => {
    md.core.ruler.before('block', 'tooltip_escape', (state) => {
        state.src = rewriteTips(state.src)
    })

    md.inline.ruler.before('escape', 'tooltip', (state, silent) => {
        const start = state.pos

        if (state.src.charCodeAt(start) !== 0x5B /* [ */ || isEscaped(state.src, start)) {
            return false
        }

        const match = PATTERN.exec(state.src.slice(start))

        if (!match) {
            return false
        }

        if (!silent) {
            const openToken = state.push('tooltip_open', 'span', 1)
            openToken.attrSet('class', 'vp-doc-tip')

            const textToken = state.push('tooltip_text', '', 0)
            textToken.content = unescape(match[1] ?? '')

            const bodyToken = state.push('tooltip_body', '', 0)
            bodyToken.content = unescape(match[2])

            state.push('tooltip_close', 'span', -1)
        }

        state.pos += match[0].length

        return true
    })

    md.renderer.rules.tooltip_text = (tokens, idx) =>
        `<span class="vp-doc-tip-text">${md.utils.escapeHtml(tokens[idx].content)}</span>`

    md.renderer.rules.tooltip_body = (tokens, idx) =>
        `<span class="vp-doc-tip-body">${md.utils.escapeHtml(tokens[idx].content)}</span>`

    // 覆写删除线渲染：~~文字~~ 默认虚化遮挡，悬停或点击恢复
    md.renderer.rules.s_open = () => '<span class="vp-doc-spoiler">'
    md.renderer.rules.s_close = () => '</span>'
}
