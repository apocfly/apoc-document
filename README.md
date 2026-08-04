# Apoc 文档站

[![CC-BY-NC-SA-4.0]][CC-BY-NC-SA-4]![Markdown][![VitePress]][VitePress-URL]

> **在线访问**：[https://docs.apocfly.com](https://docs.apocfly.com)

## 关于项目

本项目为官方文档站，集中存放所有用户指南、开发者文档和运维手册。

### 技术栈

- [VitePress](https://vitepress.dev/) - 基于 Vite 的静态站点生成器
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Markdown](https://www.markdownguide.org/) - 轻量级标记语言

## 快速开始

以下步骤帮助你在本地快速启动文档站，进行预览或贡献。

### 前置要求

确保你的环境中已安装以下工具：

- [Node.js](https://nodejs.org/) 18.0 或更高版本
- [pnpm](https://pnpm.io/) 包管理器 (或任意包管理工具如yarn)
- [Git](https://git-scm.com/) 版本控制系统

如果本地尚未安装 pnpm，可使用 Node.js 自带的 npm 安装：

```bash
npm install -g pnpm
```

### 克隆仓库

```bash
git clone https://github.com/your-org/apoc-document.git
cd apoc-document
```

### 安装依赖

```bash
pnpm install
```

### 本地开发

启动本地开发服务器：

```bash
pnpm run docs:dev
```

启动后，在浏览器中访问[http://localhost:5173](http://localhost:5173)即可实时预览文档。

### 构建生产版本

```bash
pnpm run docs:build
```

构建产物将输出到 `docs/.vitepress/dist` 目录，可用于部署。

## CI/CD

| 分支	       | 部署地址                                                       | 	用途 |
|:----------|:-----------------------------------------------------------|:----|
| `main`    | [https://predocs.apocfly.com](https://predocs.apocfly.com) | 预览版 |
| `release` | [https://docs.apocfly.com](https://docs.apocfly.com)       | 正式版 |

## 许可证

本项目采用 [署名—非商业性使用—相同方式共享 4.0 协议国际版 (CC BY-NC-SA 4.0)][CC-BY-NC-SA-4] 授权。

### 您可以自由地：

- **分享** — 在任何媒介以任何形式复制、发行本作品
- **演绎** — 修改、转换或以本作品为基础进行创作

### 惟须遵守以下条件：

- **署名** — 您必须给出适当的署名，提供指向本许可协议的链接，同时标明是否（对原始作品）作了修改。您可以用任何合理的方式来署名，但是不得以任何方式暗示许可人为您或您的使用背书。
- **非商业性使用** — 您不得将本作品用于商业目的。
- **相同方式共享** — 如果您再混合、转换或者基于本作品进行创作，您必须基于与原先许可协议相同的许可协议 分发您贡献的作品。
- **没有附加限制** — 您不得适用法律术语或者技术措施从而限制其他人做许可协议允许的事情。

完整许可协议请参见：[CC BY-NC-SA 4.0 中文版][CC-BY-NC-SA-4]

## 项目贡献者

![](https://contrib.rocks/image?repo=apocfly/apoc-document)

我们欢迎每一位贡献者！如果你希望参与文档编写、功能改进或问题反馈，请查阅[贡献指南](./CONTRIBUTING.md)。

## 特别鸣谢

感谢以下成员曾为项目付出的心血：

- [@Master_Gui](https://github.com/supermastergui)
- [@XiaoZhang-store](https://github.com/XiaoZhang-store)

---

[CC-BY-NC-SA-4.0]: https://img.shields.io/badge/License-CC%20BY%20NC%20SA%204.0-lightgrey.svg?style=for-the-badge

[CC-BY-NC-SA-4]: https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans

[Markdown]: https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=Markdown&logoColor=ffffff

[VitePress]: https://img.shields.io/badge/VitePress-646CFF?style=for-the-badge&logo=vite&logoColor=white

[VitePress-URL]: https://github.com/vuejs/vitepress
