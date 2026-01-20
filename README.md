# 🎸 吉他大师 (Guitar Master) - 从零到大师

![吉他大师封面图](./docs/cover.png)

致力于打造最科学、最有趣的吉他自学平台。通过游戏化的关卡设计和实时音频识别技术，带你开启一场史诗级的音乐冒险之旅。

## 🚀 项目概览

本项目已从 Vite 迁移至 **Next.js 15 (App Router)** 架构，旨在提供更优的性能、更好的 SEO 支持以及无缝的 Vercel 部署体验。

### ✨ 核心特性

- **🗺️ 游戏化世界地图**：采用关卡制教学体系，从“初识琴弦”到“大师之路”，每一步成长都清晰可见。
- **🎯 实时音频互动引擎**：内置高精度音频识别算法，拿起真实吉他进行练习，系统实时监测音符准确性并给予即时反馈。
- **📚 沉浸式曲谱库**：支持流行、摇滚、民谣等多种风格曲谱。提供**谱面预览**功能及**离线下载**支持。
- **🛠️ 大师工具箱**：
  - **调音器 (Tuner)**：高精度实时频率检测。
  - **节拍器 (Metronome)**：稳定可靠的节奏训练伙伴。
  - **和弦库 (Chord Chart)**：交互式和弦指法图示，支持点击试听。
- **📈 进度追踪系统**：自动记录已完成关卡，累积 XP 经验值，见证你的蜕变。

## 🛠️ 技术栈

- **框架**: [Next.js 15 (App Router)](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图标**: [Lucide React](https://lucide.dev/)
- **内容**: [React Markdown](https://github.com/remarkjs/react-markdown) + [Remark GFM](https://github.com/remarkjs/remark-gfm)
- **部署**: [Vercel](https://vercel.com/)

## 📦 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/your-repo/guitar-zero-to-master.git
   cd guitar-zero-to-master
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

## 📂 目录结构

```text
src/
├── app/              # Next.js App Router 页面与路由
├── components/       # 可复用的 UI 组件（调音器、节拍器、实战模式等）
├── hooks/            # 自定义 React Hooks（进度管理、音频检测等）
├── lib/              # 静态数据与工具函数
├── styles/           # 全局样式配置
docs/
└── tutorial/         # Markdown 格式的课程教程内容
public/
└── docs/images/      # 教程配套图片资源
```

## 📝 贡献指南

我们欢迎任何形式的贡献，无论是修复 Bug、改进 UI 还是增加新的课程内容。

---

愿音乐与你同在！ 🎶
