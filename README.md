# DSH Image Editor

A small Photoshop-style image editor for the **DeepSeek Harness (DSH) Web UI**.
It adds a left-sidebar entry that opens a canvas editor in the main column:
open, crop, rotate/flip, resize, adjust colors, undo/redo, and export PNG/JPEG.

Everything runs locally in the browser. Images are never uploaded.

[中文说明](#中文说明)

## Features

- Open an image from a file picker, drag-and-drop, clipboard paste, or the Clipboard API.
- Crop with a draggable selection and live pixel dimensions.
- Rotate 90° left/right, flip horizontally/vertically.
- Resize with optional aspect-ratio lock.
- Brightness, contrast, saturation sliders; grayscale, sepia, invert toggles.
- Undo/redo history (up to 20 steps), preserved while switching panels.
- Fit-to-window / actual size / zoom controls.
- Export PNG or JPEG (quality slider).
- Keyboard shortcuts: `Ctrl/⌘+O`, `Ctrl/⌘+Z`, `Ctrl/⌘+Shift+Z`, `Ctrl/⌘+S`, `Ctrl/⌘+V`, `Esc`.
- Light/dark theme via DSH theme tokens; no external runtime dependencies.

## Install

This is a DSH client plugin bundle. It has no build step and no npm dependencies.

### DSH Desktop

Install it from the app rather than the CLI, because the Desktop profile is
managed by the Electron application:

1. Open **Settings → Plugins → Add**.
2. Enter `github:18924110283/dsh-image-editor`, or point it at a local clone.
3. Enable **Image Editor** in the plugin list.

### DSH profiles managed by the CLI

```sh
dsh plugin --profile <profile> add github:18924110283/dsh-image-editor
```

For local development, add this directory instead:

```sh
dsh plugin --profile <profile> add "file:<absolute-path-to-this-directory>"
```

Or use the plugin manager's `install_bundle` action with the directory as the target.

### Development

There is no bundler. The browser artifact is `client.js`; DSH loads it through
its client module table. After editing, reinstall the bundle or reload the
client. The editor only needs React from the browser module table.

## Using it

Click the image icon in the left sidebar. The first time, open an image (or
paste one). Select an area with **Crop**, then apply it. Adjustments preview
live on the canvas; **Apply adjustments** bakes them into the pixels. Export
writes a PNG or JPEG download.

## Limitations

This is intentionally a focused first version, not a full Photoshop:

- Single layer; no layers, masks, blend modes, or layer styles.
- No brush, eraser, lasso, magic wand, or selection tools other than crop.
- No text tool, shapes, gradients, curves, or levels.
- History is capped at 20 steps and lives in memory for the current page.
- Very large images are limited by browser canvas memory.

## Privacy

All decoding, editing, and encoding happen in the local browser canvas. The
plugin does not send image data anywhere, and it has no network code.

## License

MIT. See [LICENSE](LICENSE).

---

## 中文说明

一个给 **DeepSeek Harness（DSH）Web UI** 用的小型图像编辑器。左侧栏会多一个
图片图标，点开后是画布编辑器：打开、裁剪、旋转/翻转、改尺寸、调色、撤销重做、
导出 PNG/JPEG。

所有处理都在本地浏览器完成，图片不会上传。

### 功能

- 文件选择、拖拽、`Ctrl/⌘+V` 粘贴、剪贴板读取
- 拖框裁剪，显示选区像素尺寸
- 左右旋转 90°、水平/垂直翻转
- 改宽高，可锁定比例
- 亮度、对比度、饱和度；黑白、怀旧、反色
- 撤销/重做（最多 20 步），切走面板再回来仍保留
- 适应窗口 / 实际大小 / 缩放
- 导出 PNG / JPEG（可调质量）
- 快捷键：`Ctrl/⌘+O`、`Ctrl/⌘+Z`、`Ctrl/⌘+Shift+Z`、`Ctrl/⌘+S`、`Ctrl/⌘+V`、`Esc`
- 跟随 DSH 明暗主题，无外部运行时依赖

### 安装

这是一个 DSH 客户端插件 bundle，没有构建步骤，也没有 npm 依赖。

**Desktop**：设置 → 插件 → 添加，填入 `github:18924110283/dsh-image-editor`（或本地克隆目录），
然后在插件列表里启用 **图像编辑器**。Desktop 的 profile 由应用管理，不建议用 CLI 直接装。

**CLI 管理的 profile**：

```sh
dsh plugin --profile <profile> add github:18924110283/dsh-image-editor
```

本地开发时改用目录：

```sh
dsh plugin --profile <profile> add "file:<绝对路径>"
```

或通过插件管理器的 `install_bundle` 指定目录。

### 限制

这是第一版，不是完整 Photoshop：

- 单图层，没有图层、蒙版、混合模式
- 没有画笔、橡皮、套索、魔棒（裁剪除外）
- 没有文字、形状、渐变、曲线、色阶
- 历史最多 20 步，只保留在当前页面内存里
- 超大图片受浏览器画布内存限制

### 隐私

解码、编辑、编码全部在本地浏览器画布内完成，插件没有网络代码，不会上传图片。

### 许可证

MIT，见 [LICENSE](LICENSE)。
