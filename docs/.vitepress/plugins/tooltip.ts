import type MarkdownIt from 'markdown-it'

// 用哨兵字符代替 | 作分隔符：markdown-it 的 escape 规则会抢先消费 \|，
// 导致 inline 规则拿不到转义信息，哨兵则不会被任何内置规则处理
const SEPARATOR = '\u0001'

const trim = (value: string) => value.trim()

const isEscaped = (src: string, index: number) => src[index - 1] === '\\'

// 从 start（指向 [）扫描到与之配对的 ]：
// - 反斜杠转义的字符（\|、\[ 等）不参与配对与分列，转义交给 markdown-it 处理；
// - 方括号按深度配对，因此提示内容中可以书写 [文本](链接) 等 Markdown 语法；
// - 只有出现过深度为 1 的分隔符才视为提示，否则返回 null 交回常规解析
//   （普通链接 [文本](链接) 正是靠这一点继续走 link 规则）
const scanTooltip = (src: string, start: number, separator: string) => {
    let depth = 1
    let separatorPos = -1
    let index = start + 1

    while (index < src.length) {
        const char = src[index]

        if (char === '\\' && index + 1 < src.length && src[index + 1] !== '\n') {
            index += 2
            continue
        }

        if (char === '\n') {
            return null
        }

        if (char === '[') {
            depth++
        } else if (char === ']') {
            depth--

            if (depth === 0) {
                if (separatorPos === -1) {
                    return null
                }

                return {
                    text: src.slice(start + 1, separatorPos),
                    body: src.slice(separatorPos + 1, index),
                    close: index
                }
            }
        } else if (char === separator && depth === 1 && separatorPos === -1) {
            separatorPos = index
        }

        index++
    }

    return null
}

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
            const found = scanTooltip(source, index, '|')

            if (found) {
                result += `[${found.text}${SEPARATOR}${found.body}]`
                index = found.close + 1
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

        // silent 表示调用方只要跳过一段内容、不要 token（markdown-it 的 skipToken）。
        // 这里必须返回 false 让跳过按普通文本逐字符进行：否则链接规则扫描标签时会把
        // 提示当成"被消费的嵌套 token"，parseLinkLabel 因 disableNested 返回 -1，
        // 导致 [标签含[提示|内容]](链接) 整条链接解析失败。
        if (silent) {
            return false
        }

        if (state.src.charCodeAt(start) !== 0x5B /* [ */ || isEscaped(state.src, start)) {
            return false
        }

        // 优先匹配经 core 预处理的哨兵分隔符；兜底匹配 |，
        // 使 renderInline 解析提示内容时（不经过 core 规则）也能识别其中的嵌套提示
        const found = scanTooltip(state.src, start, SEPARATOR) ?? scanTooltip(state.src, start, '|')

        if (!found) {
            return false
        }

        const openToken = state.push('tooltip_open', 'span', 1)
        openToken.attrSet('class', 'vp-doc-tip')

        const textToken = state.push('tooltip_text', '', 0)
        textToken.content = trim(found.text)

        const bodyToken = state.push('tooltip_body', '', 0)
        bodyToken.content = trim(found.body)

        state.push('tooltip_close', 'span', -1)

        state.pos = found.close + 1

        return true
    })

    // 混合渲染：可见文字与提示体均按行内 Markdown 解析，
    // 因此链接、粗斜体、行内代码、删除线（剧透）与数学公式都可直接书写。
    // 必须把文档 env 透传给 renderInline：引用式链接的定义存放在 env.references 中，
    // 不传 env 时提示里的 [文本][ref] / [ref] 会退化成字面文本。
    md.renderer.rules.tooltip_text = (tokens, idx, options, env) =>
        `<span class="vp-doc-tip-text">${md.renderInline(tokens[idx].content, env ?? {})}</span>`

    md.renderer.rules.tooltip_body = (tokens, idx, options, env) =>
        `<span class="vp-doc-tip-body">${md.renderInline(tokens[idx].content, env ?? {})}</span>`

    // 覆写删除线渲染：~~文字~~ 默认虚化遮挡，悬停或点击恢复
    md.renderer.rules.s_open = () => '<span class="vp-doc-spoiler">'
    md.renderer.rules.s_close = () => '</span>'
}
