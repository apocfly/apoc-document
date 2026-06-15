# Apoc 文档站

[![CC-BY-4.0]][CC-BY-4]![Markdown][![VitePress]][VitePress-URL]

> **在线访问**：[https://docs.apocfly.com](https://docs.apocfly.com)

## 关于项目

**Apocalypse Flyleague (APOCFLY)** 是一个完全开源的模拟飞行平台项目，致力于降低搭建与运营专业模拟飞行环境的技术门槛。

### 技术栈

- [VitePress](https://vitepress.dev/) - 现代化静态站点生成器
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Markdown](https://www.markdownguide.org/) - 轻量级标记语言

## 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) 18.0 或更高版本
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/) 包管理器
- [Git](https://git-scm.com/) 版本控制系统

### 克隆仓库

```bash
git clone https://github.com/your-org/apoc-docs.git
cd apoc-docs
```

### 安装依赖

```bash
npm install
# 或使用 yarn
yarn install
```

### 本地开发

启动本地开发服务器（支持热重载）：

```bash
npm run docs:dev
```

服务器启动后，访问 [http://localhost:5173](http://localhost:5173) 查看文档站点。

### 构建生产版本

```bash
npm run docs:build
```

构建产物将输出到 `docs/.vitepress/dist` 目录。

## 维护团队

**当前维护者：**

- [@half-nothing](https://github.com/half-nothing) - 项目负责人

### 历史贡献者

感谢以下成员曾为项目付出的心血：

- [@Master_Gui](https://github.com/supermastergui)
- [@XiaoZhang-store](https://github.com/XiaoZhang-store)

## 参与贡献

我们热烈欢迎社区贡献！无论是修复错误、改进文档还是提出新想法，您的参与都将推动项目发展。

### 贡献流程

1. **Fork 本仓库** - 点击右上角 Fork 按钮
2. **克隆到本地** - `git clone https://github.com/your-username/apoc-docs.git`
3. **创建特性分支** - `git checkout -b feature/your-feature-name`
4. **提交更改** - `git commit -m 'feat: add some feature'`
5. **推送到远程** - `git push origin feature/your-feature-name`
6. **提交 Pull Request** - 在 GitHub 上创建 PR

### 提交规范

我们遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新增功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具链更新

### 贡献建议

- 提交前请运行 `npm run docs:dev` 确保文档能正常构建
- 保持文档内容简洁清晰，遵循既有风格
- 大型改动建议先开 Issue 讨论
- 尊重社区行为准则，友好交流

## 许可证

本项目采用 [知识共享署名 4.0 协议国际版 (CC BY 4.0)][CC-BY-4] 授权。

### 您可以自由地：

- **分享** — 在任何媒介以任何形式复制、发行本作品
- **演绎** — 修改、转换或以本作品为基础进行创作，包括商业目的

### 惟须遵守以下条件：

- **署名** — 您必须给出适当的署名，提供指向本许可协议的链接，并说明是否对原作品作了修改

完整许可协议请参见：[CC BY 4.0 中文版][CC-BY-4]

---

[CC-BY-4.0]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg?style=for-the-badge

[CC-BY-4]: https://creativecommons.org/licenses/by/4.0/deed.zh-hans

[Markdown]: https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=Markdown&logoColor=ffffff

[VitePress]: https://img.shields.io/badge/VitePress-646CFF?style=for-the-badge&logo=vite&logoColor=white

[VitePress-URL]: https://github.com/vuejs/vitepress