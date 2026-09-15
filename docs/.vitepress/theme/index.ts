import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './custom.css'

// 提示气泡交互：悬停由 CSS 负责，这里补充点击切换
// - 点击提示文字：切换 .is-open（再点一次收回）
// - 点击别处：关闭所有已固定的气泡
// - 点击气泡内部：不参与切换，便于选中文字或点击其中的链接
const enableTooltipToggle = () => {
    document.addEventListener('click', (event) => {
        const target = event.target as Element | null

        if (!target || typeof target.closest !== 'function' || target.closest('.vp-doc-tip-body')) {
            return
        }

        const tip = target.closest('.vp-doc-tip')

        document.querySelectorAll('.vp-doc-tip.is-open').forEach((opened) => {
            if (opened !== tip) {
                opened.classList.remove('is-open')
            }
        })

        tip?.classList.toggle('is-open')
    })
}

export default {
    extends: DefaultTheme,
    enhanceApp(ctx: EnhanceAppContext) {
        DefaultTheme.enhanceApp?.(ctx)

        if (typeof window !== 'undefined') {
            enableTooltipToggle()
        }
    }
}
