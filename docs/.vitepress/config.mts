import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Apoc Document",
    description: "A document website for apoc",
    ignoreDeadLinks: true,
    appearance: true,
    lastUpdated: true,
    markdown: {
        math: true
    },
    themeConfig: {
        logo: "/logo.png",
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索',
                                buttonAriaLabel: '搜索'
                            },
                            modal: {
                                displayDetails: '显示详细列表',
                                resetButtonTitle: '重置搜索',
                                backButtonTitle: '关闭搜索',
                                noResultsText: '没有结果',
                                footer: {
                                    selectText: '选择',
                                    selectKeyAriaLabel: '输入',
                                    navigateText: '导航',
                                    navigateUpKeyAriaLabel: '上箭头',
                                    navigateDownKeyAriaLabel: '下箭头',
                                    closeText: '关闭',
                                    closeKeyAriaLabel: 'Esc'
                                }
                            }
                        }
                    }
                }
            }
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/apocfly/apoc-document'}
        ],
    },
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-CN',
            themeConfig: {
                darkModeSwitchLabel: "日夜切换",
                lightModeSwitchTitle: "浅色模式",
                darkModeSwitchTitle: "深色模式",
                sidebarMenuLabel: "菜单",
                returnToTopLabel: "返回顶部",
                langMenuLabel: "切换语言",
                externalLinkIcon: true,
                outline: {
                    level: [2, 3],
                    label: "目录"
                },
                nav: [
                    {text: '首页', link: '/'},
                    {text: '行为准则', link: '/general/coc'},
                ],
                sidebar: [
                    {
                        text: '平台守则',
                        items: [
                            {text: '行为准则', link: '/general/coc'},
                            {text: '管制员培训大纲', link: '/general/cto'}
                        ]
                    },
                    {
                        text: '使用教程',
                        items: [
                            {text: 'Swift安装教程', link: '/tutorial/swift'},
                            {text: 'Teamspeak安装使用教程', link: '/tutorial/teamspeak'},
                            {text: 'AudioClient安装使用教程', link: '/tutorial/audio_client'},
                            {text: '飞行计划提交', link: '/tutorial/flightplan'},
                            {text: '航路查询', link: '/tutorial/route'},
                            {text: 'Hoppie DCL使用教程', link: '/tutorial/dcl'}
                        ]
                    },
                    {
                        text: '航空知识',
                        items: [
                            {text: 'RVSM空域', link: '/aviation/rvsm'},
                            {text: '航空器分类', link: '/aviation/aircraft_type'},
                            {text: '空域分类', link: '/aviation/airspace'},
                            {text: '飞行情报区', link: '/aviation/FIR'},
                            {text: '气压基准与高度表拨正程序', link: '/aviation/QNH'},
                            {text: '平行跑道运行', link: '/aviation/parallel_runway'},
                            {text: '应答机', link: '/aviation/squawk'},
                            {text: '航空器尾流间隔', link: '/aviation/turbulence'},
                            {text: '程序过渡点', link: '/aviation/via'},
                            {text: '陆空对话', link: '/aviation/airground'},
                        ]
                    },
                    {
                        text: '技术文档',
                        items: [
                            {text: '语音系统概述', link: '/technical/voice'}
                        ]
                    }
                ],
                docFooter: {
                    prev: '上一页',
                    next: '下一页'
                },
                footer: {
                    message: '本项目的全部文字在 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans">CC BY-NC-SA 4.0</a> 条款下提供，附加条款亦可能应用。保留所有未明示授予的权利。',
                    copyright: '仅供模拟飞行使用，请勿用于真实飞行。 Copyright © 2026-present APOCFLY'
                },
                editLink: {
                    pattern: 'https://github.com/apocfly/apoc-document/tree/main/docs/:path',
                    text: '在 GitHub 上编辑此页面'
                },
                lastUpdated: {
                    text: '最后更新时间',
                    formatOptions: {
                        dateStyle: 'long',
                        timeStyle: 'long',
                        forceLocale: true
                    }
                }
            }
        }
    }
})
