import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Apoc Document",
    description: "A document website for apoc",
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-CN',
            themeConfig: {
                nav: [
                    {text: '首页', link: '/'},
                    {text: '行为准则', link: '/general/coc'},
                ],
                sidebar: [
                    {
                        text: '平台总则',
                        items: [
                            {text: '行为准则', link: '/general/coc'}
                        ]
                    },
                    {
                        text: '飞行员部分',
                        items: []
                    },
                    {
                        text: '管制员部分',
                        items: []
                    }
                ],
                socialLinks: [
                    {icon: 'github', link: 'https://github.com/apocfly/apoc-document'}
                ],
                footer: {
                    message: '本项目的全部文字在 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh-hans">CC BY 4.0</a> 条款下提供，附加条款亦可能应用。保留所有未明示授予的权利。',
                    copyright: '仅供模拟飞行使用，请勿用于真实飞行。 Copyright © 2026-present APOCFLY'
                }
            }
        }
        // en: {
        //     label: 'English',
        //     lang: 'en-US',
        //     link: '/en/',
        //     themeConfig: {
        //         nav: [
        //             {text: 'Home', link: '/en/'},
        //             {text: 'Examples', link: '/en/markdown-examples'}
        //         ],
        //         sidebar: [
        //             {
        //                 text: 'Examples',
        //                 items: [
        //                     {text: 'Markdown Examples', link: '/en/markdown-examples'},
        //                     {text: 'Runtime API Examples', link: '/en/api-examples'}
        //                 ]
        //             }
        //         ],
        //         socialLinks: [
        //             {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        //         ]
        //     }
        // }
    }
})
