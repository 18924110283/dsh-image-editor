window.__ModuleLoader__.load({
  id: '@local/image-editor',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'image-editor';
    const PANEL_ID = 'image-editor';
    const MAX_HISTORY = 20;

    const zh = {
      'panel.label': '图像编辑器',
      title: '图像编辑器',
      open: '打开图片',
      paste: '从剪贴板粘贴',
      undo: '撤销',
      redo: '重做',
      zoomIn: '放大',
      zoomOut: '缩小',
      fit: '适应窗口',
      actual: '实际大小',
      'empty.title': '打开一张图片开始编辑',
      'empty.body': '支持 PNG、JPEG、WebP、GIF 等格式，也可以直接粘贴或拖入图片。',
      'empty.hint': '图片只在本地浏览器中处理，不会上传。',
      crop: '裁剪',
      'crop.hint': '在画布上拖出要保留的区域',
      'crop.size': '选区 {w} × {h} px',
      'crop.apply': '应用裁剪',
      'crop.cancel': '取消',
      adjust: '调整',
      brightness: '亮度',
      contrast: '对比度',
      saturation: '饱和度',
      grayscale: '黑白',
      sepia: '怀旧',
      invert: '反色',
      'adjust.apply': '应用调整',
      'adjust.reset': '重置',
      transform: '变换',
      'rotate.left': '向左旋转 90°',
      'rotate.right': '向右旋转 90°',
      'flip.h': '水平翻转',
      'flip.v': '垂直翻转',
      resize: '尺寸',
      width: '宽度',
      height: '高度',
      'resize.keep': '保持比例',
      'resize.apply': '应用尺寸',
      export: '导出',
      quality: 'JPEG 质量',
      'export.png': '导出 PNG',
      'export.jpeg': '导出 JPEG',
      status: '{w} × {h} px',
      'status.history': '{undo} 步可撤销 · {redo} 步可重做',
      'notice.loadFailed': '这张图片无法读取',
      'notice.notImage': '请选择图片文件',
      'notice.exported': '已开始下载',
      'notice.exportFailed': '导出失败',
      'notice.invalidSize': '请输入有效的宽高',
      shortcuts: '快捷键',
      'shortcut.open': 'Ctrl/⌘ + O 打开',
      'shortcut.undo': 'Ctrl/⌘ + Z 撤销',
      'shortcut.redo': 'Ctrl/⌘ + Shift + Z 重做',
      'shortcut.export': 'Ctrl/⌘ + S 导出 PNG',
      'shortcut.escape': 'Esc 取消裁剪选区',
      'shortcut.paste': 'Ctrl/⌘ + V 粘贴图片',
      'tip.local': '所有处理都在当前浏览器内完成。',
    };

    const en = {
      'panel.label': 'Image editor',
      title: 'Image editor',
      open: 'Open image',
      paste: 'Paste from clipboard',
      undo: 'Undo',
      redo: 'Redo',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      fit: 'Fit to window',
      actual: 'Actual size',
      'empty.title': 'Open an image to start editing',
      'empty.body': 'PNG, JPEG, WebP, GIF and more. You can also paste or drop an image here.',
      'empty.hint': 'The image is processed in this browser only and never uploaded.',
      crop: 'Crop',
      'crop.hint': 'Drag on the canvas to keep an area',
      'crop.size': 'Selection {w} × {h} px',
      'crop.apply': 'Apply crop',
      'crop.cancel': 'Cancel',
      adjust: 'Adjust',
      brightness: 'Brightness',
      contrast: 'Contrast',
      saturation: 'Saturation',
      grayscale: 'Grayscale',
      sepia: 'Sepia',
      invert: 'Invert',
      'adjust.apply': 'Apply adjustments',
      'adjust.reset': 'Reset',
      transform: 'Transform',
      'rotate.left': 'Rotate left 90°',
      'rotate.right': 'Rotate right 90°',
      'flip.h': 'Flip horizontal',
      'flip.v': 'Flip vertical',
      resize: 'Size',
      width: 'Width',
      height: 'Height',
      'resize.keep': 'Keep aspect ratio',
      'resize.apply': 'Apply size',
      export: 'Export',
      quality: 'JPEG quality',
      'export.png': 'Export PNG',
      'export.jpeg': 'Export JPEG',
      status: '{w} × {h} px',
      'status.history': '{undo} undo · {redo} redo',
      'notice.loadFailed': 'This image could not be read',
      'notice.notImage': 'Choose an image file',
      'notice.exported': 'Download started',
      'notice.exportFailed': 'Export failed',
      'notice.invalidSize': 'Enter a valid width and height',
      shortcuts: 'Shortcuts',
      'shortcut.open': 'Ctrl/⌘ + O to open',
      'shortcut.undo': 'Ctrl/⌘ + Z to undo',
      'shortcut.redo': 'Ctrl/⌘ + Shift + Z to redo',
      'shortcut.export': 'Ctrl/⌘ + S to export PNG',
      'shortcut.escape': 'Esc to cancel the crop selection',
      'shortcut.paste': 'Ctrl/⌘ + V to paste an image',
      'tip.local': 'Everything runs in this browser.',
    };

    const CSS = `
.ie-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
}
.ie-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
}
.ie-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}
.ie-brand svg { color: var(--dsw-alias-brand-primary); flex: none; }
.ie-top-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}
.ie-divider {
  width: 1px;
  height: 18px;
  margin: 0 2px;
  background: var(--dsw-alias-border-l1);
}
.ie-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 7px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font-family: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  white-space: nowrap;
}
.ie-btn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); }
.ie-btn:disabled { opacity: 0.4; cursor: default; }
.ie-btn.ie-primary {
  border-color: transparent;
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-bg-base);
  font-weight: 600;
}
.ie-btn.ie-primary:hover:not(:disabled) { background: var(--dsw-alias-brand-primary); opacity: 0.92; }
.ie-btn.ie-icon { width: 30px; padding: 0; }
.ie-btn:focus-visible,
.ie-rail-btn:focus-visible,
.ie-slider:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}
.ie-body {
  display: flex;
  flex: 1;
  min-height: 0;
}
.ie-rail {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: none;
  width: 48px;
  padding: 8px 6px;
  border-right: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
}
.ie-rail-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}
.ie-rail-btn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ie-rail-btn[data-active='true'] {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-brand-primary);
}
.ie-rail-btn:disabled { opacity: 0.35; cursor: default; }
.ie-stage {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: auto;
  padding: 24px;
  background-color: var(--dsw-alias-bg-layer-1);
  background-image: conic-gradient(
    var(--dsw-alias-bg-layer-2) 25%,
    transparent 0 50%,
    var(--dsw-alias-bg-layer-2) 0 75%,
    transparent 0
  );
  background-size: 18px 18px;
}
.ie-canvas-wrap {
  position: relative;
  margin: 0 auto;
  box-shadow: 0 2px 14px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
  background: var(--dsw-alias-bg-base);
  touch-action: none;
}
.ie-canvas {
  display: block;
  width: 100%;
  height: 100%;
  image-rendering: auto;
}
.ie-crop-box {
  position: absolute;
  border: 1px dashed var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
  pointer-events: none;
}
.ie-crop-box::before,
.ie-crop-box::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border: 1px solid var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-bg-base);
}
.ie-crop-box::before { left: -4px; top: -4px; }
.ie-crop-box::after { right: -4px; bottom: -4px; }
.ie-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 320px;
  padding: 32px;
  text-align: center;
}
.ie-empty-glyph {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 14px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 16px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-secondary);
}
.ie-empty-title {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
}
.ie-empty-body {
  max-width: 420px;
  margin: 8px 0 16px;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-secondary);
}
.ie-empty-actions { display: flex; gap: 8px; }
.ie-empty-hint {
  margin-top: 16px;
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-secondary);
}
.ie-panel {
  flex: none;
  width: 264px;
  overflow-y: auto;
  border-left: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
}
.ie-panel-inner { padding: 14px; display: flex; flex-direction: column; gap: 16px; }
.ie-section { display: flex; flex-direction: column; gap: 9px; }
.ie-section-title {
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-secondary);
}
.ie-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ie-label { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.ie-value {
  font-size: 11px;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-secondary);
}
.ie-slider {
  width: 100%;
  height: 18px;
  margin: 0;
  accent-color: var(--dsw-alias-brand-primary);
  cursor: pointer;
}
.ie-toggle-row { display: flex; gap: 6px; flex-wrap: wrap; }
.ie-chip {
  height: 26px;
  padding: 0 9px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 6px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-secondary);
  font-family: inherit;
  font-size: 11px;
  line-height: 16px;
  cursor: pointer;
}
.ie-chip[data-on='true'] {
  border-color: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
}
.ie-field-row { display: flex; align-items: center; gap: 8px; }
.ie-field {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}
.ie-input {
  width: 100%;
  min-width: 0;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 6px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font-family: inherit;
  font-size: 12px;
  line-height: 18px;
}
.ie-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.ie-check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}
.ie-check input { accent-color: var(--dsw-alias-brand-primary); margin: 0; }
.ie-actions { display: flex; gap: 6px; }
.ie-actions .ie-btn { flex: 1; }
.ie-crop-info {
  padding: 8px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-1);
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-secondary);
}
.ie-shortcuts {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-secondary);
}
.ie-shortcuts kbd {
  padding: 1px 4px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 4px;
  background: var(--dsw-alias-bg-layer-1);
  font-family: inherit;
  font-size: 10px;
}
.ie-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 28px;
  padding: 0 14px;
  border-top: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-secondary);
  font-variant-numeric: tabular-nums;
}
.ie-status-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
.ie-notice { color: var(--dsw-alias-state-success-primary); }
.ie-notice[data-error='true'] { color: var(--dsw-alias-state-error-primary); }
@media (max-width: 900px) {
  .ie-panel { width: 220px; }
  .ie-brand span { display: none; }
}
`;

    const DEFAULTS = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      grayscale: 0,
      sepia: 0,
      invert: 0,
    };

    const shared = {
      doc: null,
      undo: [],
      redo: [],
      adjustments: { ...DEFAULTS },
      fileName: '',
    };

    function makeCanvas(width, height) {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(width));
      canvas.height = Math.max(1, Math.round(height));
      return canvas;
    }

    function cloneCanvas(source) {
      const canvas = makeCanvas(source.width, source.height);
      canvas.getContext('2d').drawImage(source, 0, 0);
      return canvas;
    }

    function filterCss(values) {
      return (
        'brightness(' + values.brightness + '%) ' +
        'contrast(' + values.contrast + '%) ' +
        'saturate(' + values.saturation + '%) ' +
        'grayscale(' + values.grayscale + '%) ' +
        'sepia(' + values.sepia + '%) ' +
        'invert(' + values.invert + '%)'
      );
    }

    function hasAdjustments(values) {
      return Object.keys(DEFAULTS).some((key) => values[key] !== DEFAULTS[key]);
    }

    function filteredCanvas(source, values) {
      const canvas = makeCanvas(source.width, source.height);
      const context = canvas.getContext('2d');
      context.filter = filterCss(values);
      context.drawImage(source, 0, 0);
      return canvas;
    }

    function rotatedCanvas(source, degrees) {
      const swap = Math.abs(degrees) % 180 === 90;
      const canvas = makeCanvas(swap ? source.height : source.width, swap ? source.width : source.height);
      const context = canvas.getContext('2d');
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((degrees * Math.PI) / 180);
      context.drawImage(source, -source.width / 2, -source.height / 2);
      return canvas;
    }

    function flippedCanvas(source, horizontal) {
      const canvas = makeCanvas(source.width, source.height);
      const context = canvas.getContext('2d');
      context.translate(horizontal ? canvas.width : 0, horizontal ? 0 : canvas.height);
      context.scale(horizontal ? -1 : 1, horizontal ? 1 : -1);
      context.drawImage(source, 0, 0);
      return canvas;
    }

    function resizedCanvas(source, width, height) {
      const canvas = makeCanvas(width, height);
      const context = canvas.getContext('2d');
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(source, 0, 0, canvas.width, canvas.height);
      return canvas;
    }

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function baseName(name) {
      return String(name || 'image').replace(/\.[^.]+$/, '') || 'image';
    }

    function download(blob, filename) {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }

    const ICONS = {
      open: ['M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', 'M4 11h16'],
      image: ['M4 5h16v14H4z', 'M8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M5 18l5-5 4 4 3-3 4 4'],
      undo: ['M9 7L4 12l5 5', 'M4 12h9a5 5 0 0 1 0 10h-1'],
      redo: ['M15 7l5 5-5 5', 'M20 12h-9a5 5 0 0 0 0 10h1'],
      crop: ['M6 3v15h15', 'M3 6h15v15'],
      rotateLeft: ['M4 4v5h5', 'M4.5 9a8 8 0 1 1 1.5 7'],
      rotateRight: ['M20 4v5h-5', 'M19.5 9a8 8 0 1 0-1.5 7'],
      flipH: ['M12 3v18', 'M4 7l6 5-6 5z', 'M20 7l-6 5 6 5z'],
      flipV: ['M3 12h18', 'M7 4l5 6 5-6z', 'M7 20l5-6 5 6z'],
      download: ['M12 3v12', 'M7 10l5 5 5-5', 'M5 21h14'],
    };

    function Icon(props) {
      const paths = ICONS[props.name] || [];
      const size = props.size || 16;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.7,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block', flex: 'none' },
        },
        paths.map((d, index) => h('path', { key: index, d }))
      );
    }

    function EditorIcon({ size }) {
      const edge = typeof size === 'number' && size > 0 ? size : 20;
      return h(
        'svg',
        {
          width: edge,
          height: edge,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('rect', { x: 3.5, y: 4.5, width: 17, height: 15, rx: 3 }),
        h('circle', { cx: 8.5, cy: 9.5, r: 1.6 }),
        h('path', { d: 'M4.5 17l5-5 4 4 3-3 3.5 4' })
      );
    }

    function ImageEditorPage(props) {
      const t = props.t;
      const [docVersion, setDocVersion] = React.useState(shared.doc ? 1 : 0);
      const [historyVersion, setHistoryVersion] = React.useState(0);
      const [adjustments, setAdjustments] = React.useState(shared.adjustments);
      const [tool, setTool] = React.useState('crop');
      const [crop, setCrop] = React.useState(null);
      const [zoomMode, setZoomMode] = React.useState('fit');
      const [zoom, setZoom] = React.useState(1);
      const [fitScale, setFitScale] = React.useState(1);
      const [fileName, setFileName] = React.useState(shared.fileName || '');
      const [resizeW, setResizeW] = React.useState(0);
      const [resizeH, setResizeH] = React.useState(0);
      const [keepRatio, setKeepRatio] = React.useState(true);
      const [jpegQuality, setJpegQuality] = React.useState(92);
      const [notice, setNotice] = React.useState('');
      const [noticeError, setNoticeError] = React.useState(false);

      const viewRef = React.useRef(null);
      const stageRef = React.useRef(null);
      const fileRef = React.useRef(null);
      const docRef = React.useRef(shared.doc);
      const undoRef = React.useRef(shared.undo);
      const redoRef = React.useRef(shared.redo);
      const cropStartRef = React.useRef(null);

      React.useEffect(() => {
        shared.doc = docRef.current;
        shared.undo = undoRef.current;
        shared.redo = redoRef.current;
      }, []);

      React.useEffect(() => {
        shared.adjustments = adjustments;
      }, [adjustments]);

      React.useEffect(() => {
        shared.fileName = fileName;
      }, [fileName]);

      const showNotice = (text, error) => {
        setNotice(text);
        setNoticeError(Boolean(error));
      };

      React.useEffect(() => {
        if (!notice) return undefined;
        const timer = setTimeout(() => setNotice(''), 2600);
        return () => clearTimeout(timer);
      }, [notice]);

      const bump = () => {
        setDocVersion((value) => value + 1);
        setHistoryVersion((value) => value + 1);
      };

      const pushHistory = () => {
        const doc = docRef.current;
        if (!doc) return;
        undoRef.current.push(cloneCanvas(doc.canvas));
        if (undoRef.current.length > MAX_HISTORY) undoRef.current.shift();
        redoRef.current.length = 0;
      };

      const commit = (canvas) => {
        const previous = docRef.current;
        docRef.current = {
          canvas,
          width: canvas.width,
          height: canvas.height,
          name: previous ? previous.name : '',
        };
        shared.doc = docRef.current;
        bump();
      };

      const undo = () => {
        const doc = docRef.current;
        if (!doc || undoRef.current.length === 0) return;
        const previous = undoRef.current.pop();
        redoRef.current.push(cloneCanvas(doc.canvas));
        docRef.current = {
          canvas: previous,
          width: previous.width,
          height: previous.height,
          name: doc.name,
        };
        shared.doc = docRef.current;
        setCrop(null);
        bump();
      };

      const redo = () => {
        const doc = docRef.current;
        if (!doc || redoRef.current.length === 0) return;
        const next = redoRef.current.pop();
        undoRef.current.push(cloneCanvas(doc.canvas));
        docRef.current = {
          canvas: next,
          width: next.width,
          height: next.height,
          name: doc.name,
        };
        shared.doc = docRef.current;
        setCrop(null);
        bump();
      };

      const openFile = React.useCallback(
        (file) => {
          if (!file || !String(file.type || '').startsWith('image/')) {
            showNotice(t('notice.notImage'), true);
            return;
          }
          const url = URL.createObjectURL(file);
          const image = new Image();
          image.onload = () => {
            const canvas = makeCanvas(image.naturalWidth, image.naturalHeight);
            canvas.getContext('2d').drawImage(image, 0, 0);
            undoRef.current.length = 0;
            redoRef.current.length = 0;
            docRef.current = {
              canvas,
              width: canvas.width,
              height: canvas.height,
              name: file.name,
            };
            shared.doc = docRef.current;
            shared.undo = undoRef.current;
            shared.redo = redoRef.current;
            shared.fileName = file.name;
            setAdjustments({ ...DEFAULTS });
            setCrop(null);
            setZoomMode('fit');
            setFileName(file.name);
            setResizeW(canvas.width);
            setResizeH(canvas.height);
            showNotice('');
            bump();
            URL.revokeObjectURL(url);
          };
          image.onerror = () => {
            URL.revokeObjectURL(url);
            showNotice(t('notice.loadFailed'), true);
          };
          image.src = url;
        },
        [t]
      );

      React.useEffect(() => {
        const onPaste = (event) => {
          const items = event.clipboardData && event.clipboardData.items;
          if (!items) return;
          for (const item of items) {
            if (String(item.type || '').startsWith('image/')) {
              const file = item.getAsFile();
              if (file) {
                event.preventDefault();
                openFile(file);
                return;
              }
            }
          }
        };
        window.addEventListener('paste', onPaste);
        return () => window.removeEventListener('paste', onPaste);
      }, [openFile]);

      React.useEffect(() => {
        const doc = docRef.current;
        const canvas = viewRef.current;
        if (!doc || !canvas) return;
        if (canvas.width !== doc.width || canvas.height !== doc.height) {
          canvas.width = doc.width;
          canvas.height = doc.height;
        }
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(doc.canvas, 0, 0);
      }, [docVersion]);

      React.useEffect(() => {
        const doc = docRef.current;
        if (!doc) return;
        setResizeW(doc.width);
        setResizeH(doc.height);
      }, [docVersion]);

      React.useEffect(() => {
        const element = stageRef.current;
        if (!element) return undefined;
        const compute = () => {
          const doc = docRef.current;
          if (!doc) return;
          const width = Math.max(80, element.clientWidth - 72);
          const height = Math.max(80, element.clientHeight - 72);
          const next = Math.min(width / doc.width, height / doc.height, 1);
          setFitScale(next > 0.02 ? next : 0.02);
        };
        compute();
        const observer = new ResizeObserver(compute);
        observer.observe(element);
        return () => observer.disconnect();
      }, [docVersion]);

      const doc = docRef.current;
      const scale = zoomMode === 'fit' ? fitScale : zoom;
      const undoCount = undoRef.current.length;
      const redoCount = redoRef.current.length;

      const zoomTo = (next) => {
        const value = clamp(next, 0.05, 8);
        setZoomMode('custom');
        setZoom(value);
      };

      const onPointerDown = (event) => {
        if (tool !== 'crop' || !doc || event.button !== 0) return;
        const rect = viewRef.current.getBoundingClientRect();
        const x = clamp(((event.clientX - rect.left) / rect.width) * doc.width, 0, doc.width);
        const y = clamp(((event.clientY - rect.top) / rect.height) * doc.height, 0, doc.height);
        cropStartRef.current = { x, y };
        setCrop({ x, y, w: 0, h: 0 });
        event.currentTarget.setPointerCapture?.(event.pointerId);
      };

      const onPointerMove = (event) => {
        const start = cropStartRef.current;
        if (!start || !doc) return;
        const rect = viewRef.current.getBoundingClientRect();
        const x = clamp(((event.clientX - rect.left) / rect.width) * doc.width, 0, doc.width);
        const y = clamp(((event.clientY - rect.top) / rect.height) * doc.height, 0, doc.height);
        setCrop({
          x: Math.min(start.x, x),
          y: Math.min(start.y, y),
          w: Math.abs(x - start.x),
          h: Math.abs(y - start.y),
        });
      };

      const onPointerUp = () => {
        if (!cropStartRef.current) return;
        cropStartRef.current = null;
        setCrop((current) => {
          if (!current || current.w < 2 || current.h < 2) return null;
          return current;
        });
      };

      const applyCrop = () => {
        if (!doc || !crop || crop.w < 1 || crop.h < 1) return;
        pushHistory();
        const canvas = makeCanvas(crop.w, crop.h);
        canvas
          .getContext('2d')
          .drawImage(doc.canvas, crop.x, crop.y, crop.w, crop.h, 0, 0, canvas.width, canvas.height);
        setCrop(null);
        commit(canvas);
      };

      const rotate = (degrees) => {
        if (!docRef.current) return;
        pushHistory();
        setCrop(null);
        commit(rotatedCanvas(docRef.current.canvas, degrees));
      };

      const flip = (horizontal) => {
        if (!docRef.current) return;
        pushHistory();
        setCrop(null);
        commit(flippedCanvas(docRef.current.canvas, horizontal));
      };

      const applyAdjustments = () => {
        if (!docRef.current || !hasAdjustments(adjustments)) return;
        pushHistory();
        commit(filteredCanvas(docRef.current.canvas, adjustments));
        setAdjustments({ ...DEFAULTS });
      };

      const applyResize = () => {
        if (!docRef.current) return;
        const width = Math.round(Number(resizeW));
        const height = Math.round(Number(resizeH));
        if (!(width > 0 && height > 0)) {
          showNotice(t('notice.invalidSize'), true);
          return;
        }
        if (width === docRef.current.width && height === docRef.current.height) return;
        pushHistory();
        setCrop(null);
        commit(resizedCanvas(docRef.current.canvas, width, height));
      };

      const exportAs = (type) => {
        const current = docRef.current;
        if (!current) return;
        const canvas = makeCanvas(current.width, current.height);
        const context = canvas.getContext('2d');
        if (type === 'image/jpeg') {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.filter = filterCss(adjustments);
        context.drawImage(current.canvas, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              showNotice(t('notice.exportFailed'), true);
              return;
            }
            download(blob, baseName(fileName) + (type === 'image/jpeg' ? '.jpg' : '.png'));
            showNotice(t('notice.exported'));
          },
          type,
          jpegQuality / 100
        );
      };

      React.useEffect(() => {
        const onKey = (event) => {
          const target = event.target;
          const tag = target && target.tagName ? target.tagName : '';
          if (tag === 'INPUT' || tag === 'TEXTAREA' || (target && target.isContentEditable)) return;
          const mod = event.ctrlKey || event.metaKey;
          const key = String(event.key || '').toLowerCase();
          if (mod && key === 'z') {
            event.preventDefault();
            if (event.shiftKey) redo();
            else undo();
          } else if (mod && key === 'y') {
            event.preventDefault();
            redo();
          } else if (mod && key === 'o') {
            event.preventDefault();
            if (fileRef.current) fileRef.current.click();
          } else if (mod && key === 's') {
            event.preventDefault();
            exportAs('image/png');
          } else if (key === 'escape') {
            setCrop(null);
          }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
      });

      const percentage = Math.round(scale * 100);
      const statusSize = doc ? t('status').replace('{w}', doc.width).replace('{h}', doc.height) : '';
      const statusHistory = t('status.history')
        .replace('{undo}', undoCount)
        .replace('{redo}', redoCount);

      return h(
        React.Fragment,
        null,
        h('style', { dangerouslySetInnerHTML: { __html: CSS } }),
        h(
          'section',
          { className: 'ie-page', 'aria-label': t('title') },
          h(
            'header',
            { className: 'ie-topbar' },
            h(
              'div',
              { className: 'ie-brand' },
              h(Icon, { name: 'image', size: 18 }),
              h('span', null, t('title'))
            ),
            h(
              'div',
              { className: 'ie-top-actions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-btn ie-primary',
                  onClick: () => fileRef.current && fileRef.current.click(),
                },
                h(Icon, { name: 'open' }),
                t('open')
              ),
              h('span', { className: 'ie-divider' }),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-btn ie-icon',
                  title: t('undo'),
                  'aria-label': t('undo'),
                  disabled: undoCount === 0,
                  onClick: undo,
                },
                h(Icon, { name: 'undo' })
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-btn ie-icon',
                  title: t('redo'),
                  'aria-label': t('redo'),
                  disabled: redoCount === 0,
                  onClick: redo,
                },
                h(Icon, { name: 'redo' })
              ),
              h('span', { className: 'ie-divider' }),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-btn ie-icon',
                  title: t('zoomOut'),
                  'aria-label': t('zoomOut'),
                  disabled: !doc,
                  onClick: () => zoomTo(scale / 1.25),
                },
                '−'
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-btn',
                  title: t('fit'),
                  disabled: !doc,
                  onClick: () => {
                    if (zoomMode === 'fit') {
                      setZoomMode('custom');
                      setZoom(1);
                    } else {
                      setZoomMode('fit');
                    }
                  },
                },
                doc ? percentage + '%' : '—'
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-btn ie-icon',
                  title: t('zoomIn'),
                  'aria-label': t('zoomIn'),
                  disabled: !doc,
                  onClick: () => zoomTo(scale * 1.25),
                },
                '+'
              )
            )
          ),
          h(
            'div',
            { className: 'ie-body' },
            h(
              'nav',
              { className: 'ie-rail', 'aria-label': t('title') },
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-rail-btn',
                  title: t('crop'),
                  'aria-label': t('crop'),
                  'data-active': tool === 'crop',
                  disabled: !doc,
                  onClick: () => setTool('crop'),
                },
                h(Icon, { name: 'crop', size: 18 })
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-rail-btn',
                  title: t('rotate.left'),
                  'aria-label': t('rotate.left'),
                  disabled: !doc,
                  onClick: () => rotate(-90),
                },
                h(Icon, { name: 'rotateLeft', size: 18 })
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-rail-btn',
                  title: t('rotate.right'),
                  'aria-label': t('rotate.right'),
                  disabled: !doc,
                  onClick: () => rotate(90),
                },
                h(Icon, { name: 'rotateRight', size: 18 })
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-rail-btn',
                  title: t('flip.h'),
                  'aria-label': t('flip.h'),
                  disabled: !doc,
                  onClick: () => flip(true),
                },
                h(Icon, { name: 'flipH', size: 18 })
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'ie-rail-btn',
                  title: t('flip.v'),
                  'aria-label': t('flip.v'),
                  disabled: !doc,
                  onClick: () => flip(false),
                },
                h(Icon, { name: 'flipV', size: 18 })
              )
            ),
            h(
              'div',
              {
                className: 'ie-stage',
                ref: stageRef,
                onDragOver: (event) => event.preventDefault(),
                onDrop: (event) => {
                  event.preventDefault();
                  const file =
                    event.dataTransfer &&
                    event.dataTransfer.files &&
                    event.dataTransfer.files[0];
                  if (file) openFile(file);
                },
              },
              doc
                ? h(
                    'div',
                    {
                      className: 'ie-canvas-wrap',
                      style: {
                        width: Math.max(1, Math.round(doc.width * scale)),
                        height: Math.max(1, Math.round(doc.height * scale)),
                        cursor: tool === 'crop' ? 'crosshair' : 'default',
                      },
                      onPointerDown,
                      onPointerMove,
                      onPointerUp,
                      onPointerCancel: onPointerUp,
                    },
                    h('canvas', {
                      ref: viewRef,
                      className: 'ie-canvas',
                      style: { filter: filterCss(adjustments) },
                    }),
                    crop && crop.w > 0 && crop.h > 0
                      ? h('div', {
                          className: 'ie-crop-box',
                          style: {
                            left: crop.x * scale,
                            top: crop.y * scale,
                            width: crop.w * scale,
                            height: crop.h * scale,
                          },
                        })
                      : null
                  )
                : h(
                    'div',
                    { className: 'ie-empty' },
                    h(
                      'div',
                      { className: 'ie-empty-glyph' },
                      h(Icon, { name: 'image', size: 28 })
                    ),
                    h('h2', { className: 'ie-empty-title' }, t('empty.title')),
                    h('p', { className: 'ie-empty-body' }, t('empty.body')),
                    h(
                      'div',
                      { className: 'ie-empty-actions' },
                      h(
                        'button',
                        {
                          type: 'button',
                          className: 'ie-btn ie-primary',
                          onClick: () => fileRef.current && fileRef.current.click(),
                        },
                        h(Icon, { name: 'open' }),
                        t('open')
                      ),
                      h(
                        'button',
                        {
                          type: 'button',
                          className: 'ie-btn',
                          onClick: async () => {
                            try {
                              const items = await navigator.clipboard.read();
                              for (const item of items) {
                                const type = item.types.find((value) =>
                                  String(value).startsWith('image/')
                                );
                                if (type) {
                                  const blob = await item.getType(type);
                                  openFile(
                                    new File([blob], 'clipboard.' + String(type).split('/')[1], {
                                      type,
                                    })
                                  );
                                  return;
                                }
                              }
                              showNotice(t('notice.notImage'), true);
                            } catch (error) {
                              showNotice(t('notice.notImage'), true);
                            }
                          },
                        },
                        t('paste')
                      )
                    ),
                    h('p', { className: 'ie-empty-hint' }, t('empty.hint'))
                  )
            ),
            h(
              'aside',
              { className: 'ie-panel' },
              h(
                'div',
                { className: 'ie-panel-inner' },
                doc
                  ? h(
                      React.Fragment,
                      null,
                      crop && crop.w > 1 && crop.h > 1
                        ? h(
                            'section',
                            { className: 'ie-section' },
                            h('h3', { className: 'ie-section-title' }, t('crop')),
                            h(
                              'div',
                              { className: 'ie-crop-info' },
                              t('crop.size')
                                .replace('{w}', Math.round(crop.w))
                                .replace('{h}', Math.round(crop.h))
                            ),
                            h(
                              'div',
                              { className: 'ie-actions' },
                              h(
                                'button',
                                {
                                  type: 'button',
                                  className: 'ie-btn ie-primary',
                                  onClick: applyCrop,
                                },
                                t('crop.apply')
                              ),
                              h(
                                'button',
                                {
                                  type: 'button',
                                  className: 'ie-btn',
                                  onClick: () => setCrop(null),
                                },
                                t('crop.cancel')
                              )
                            )
                          )
                        : h(
                            'section',
                            { className: 'ie-section' },
                            h('h3', { className: 'ie-section-title' }, t('crop')),
                            h(
                              'div',
                              { className: 'ie-crop-info' },
                              t('crop.hint')
                            )
                          ),
                      h(
                        'section',
                        { className: 'ie-section' },
                        h('h3', { className: 'ie-section-title' }, t('adjust')),
                        ...[
                          ['brightness', 'brightness', 0, 200],
                          ['contrast', 'contrast', 0, 200],
                          ['saturation', 'saturation', 0, 200],
                        ].map(([key, label, min, max]) =>
                          h(
                            'div',
                            { key },
                            h(
                              'div',
                              { className: 'ie-row' },
                              h('span', { className: 'ie-label' }, t(label)),
                              h(
                                'span',
                                { className: 'ie-value' },
                                adjustments[key] + '%'
                              )
                            ),
                            h('input', {
                              className: 'ie-slider',
                              type: 'range',
                              min,
                              max,
                              value: adjustments[key],
                              onChange: (event) =>
                                setAdjustments((current) => ({
                                  ...current,
                                  [key]: Number(event.target.value),
                                })),
                            })
                          )
                        ),
                        h(
                          'div',
                          { className: 'ie-toggle-row' },
                          ...[
                            ['grayscale', 'grayscale'],
                            ['sepia', 'sepia'],
                            ['invert', 'invert'],
                          ].map(([key, label]) =>
                            h(
                              'button',
                              {
                                key,
                                type: 'button',
                                className: 'ie-chip',
                                'data-on': adjustments[key] > 0,
                                onClick: () =>
                                  setAdjustments((current) => ({
                                    ...current,
                                    [key]: current[key] > 0 ? 0 : 100,
                                  })),
                              },
                              t(label)
                            )
                          )
                        ),
                        h(
                          'div',
                          { className: 'ie-actions' },
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn ie-primary',
                              disabled: !hasAdjustments(adjustments),
                              onClick: applyAdjustments,
                            },
                            t('adjust.apply')
                          ),
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn',
                              onClick: () => setAdjustments({ ...DEFAULTS }),
                            },
                            t('adjust.reset')
                          )
                        )
                      ),
                      h(
                        'section',
                        { className: 'ie-section' },
                        h('h3', { className: 'ie-section-title' }, t('transform')),
                        h(
                          'div',
                          { className: 'ie-actions' },
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn',
                              onClick: () => rotate(-90),
                            },
                            h(Icon, { name: 'rotateLeft' }),
                            t('rotate.left')
                          ),
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn',
                              onClick: () => rotate(90),
                            },
                            h(Icon, { name: 'rotateRight' }),
                            t('rotate.right')
                          )
                        ),
                        h(
                          'div',
                          { className: 'ie-actions' },
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn',
                              onClick: () => flip(true),
                            },
                            t('flip.h')
                          ),
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn',
                              onClick: () => flip(false),
                            },
                            t('flip.v')
                          )
                        )
                      ),
                      h(
                        'section',
                        { className: 'ie-section' },
                        h('h3', { className: 'ie-section-title' }, t('resize')),
                        h(
                          'div',
                          { className: 'ie-field-row' },
                          h(
                            'label',
                            { className: 'ie-field' },
                            h('span', { className: 'ie-label' }, t('width')),
                            h('input', {
                              className: 'ie-input',
                              type: 'number',
                              min: 1,
                              value: resizeW,
                              onChange: (event) => {
                                const value = Number(event.target.value);
                                setResizeW(event.target.value);
                                if (
                                  keepRatio &&
                                  docRef.current &&
                                  Number(event.target.value) > 0
                                ) {
                                  setResizeH(
                                    Math.max(
                                      1,
                                      Math.round(
                                        (value * docRef.current.height) /
                                          docRef.current.width
                                      )
                                    )
                                  );
                                }
                              },
                            })
                          ),
                          h(
                            'label',
                            { className: 'ie-field' },
                            h('span', { className: 'ie-label' }, t('height')),
                            h('input', {
                              className: 'ie-input',
                              type: 'number',
                              min: 1,
                              value: resizeH,
                              onChange: (event) => {
                                const value = Number(event.target.value);
                                setResizeH(event.target.value);
                                if (
                                  keepRatio &&
                                  docRef.current &&
                                  Number(event.target.value) > 0
                                ) {
                                  setResizeW(
                                    Math.max(
                                      1,
                                      Math.round(
                                        (value * docRef.current.width) /
                                          docRef.current.height
                                      )
                                    )
                                  );
                                }
                              },
                            })
                          )
                        ),
                        h(
                          'label',
                          { className: 'ie-check' },
                          h('input', {
                            type: 'checkbox',
                            checked: keepRatio,
                            onChange: (event) => setKeepRatio(event.target.checked),
                          }),
                          t('resize.keep')
                        ),
                        h(
                          'button',
                          {
                            type: 'button',
                            className: 'ie-btn',
                            onClick: applyResize,
                          },
                          t('resize.apply')
                        )
                      ),
                      h(
                        'section',
                        { className: 'ie-section' },
                        h('h3', { className: 'ie-section-title' }, t('export')),
                        h(
                          'div',
                          { className: 'ie-row' },
                          h('span', { className: 'ie-label' }, t('quality')),
                          h('span', { className: 'ie-value' }, jpegQuality + '%')
                        ),
                        h('input', {
                          className: 'ie-slider',
                          type: 'range',
                          min: 40,
                          max: 100,
                          value: jpegQuality,
                          onChange: (event) =>
                            setJpegQuality(Number(event.target.value)),
                        }),
                        h(
                          'div',
                          { className: 'ie-actions' },
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn ie-primary',
                              onClick: () => exportAs('image/png'),
                            },
                            t('export.png')
                          ),
                          h(
                            'button',
                            {
                              type: 'button',
                              className: 'ie-btn',
                              onClick: () => exportAs('image/jpeg'),
                            },
                            t('export.jpeg')
                          )
                        )
                      )
                    )
                  : h(
                      React.Fragment,
                      null,
                      h(
                        'section',
                        { className: 'ie-section' },
                        h('h3', { className: 'ie-section-title' }, t('shortcuts')),
                        h(
                          'ul',
                          { className: 'ie-shortcuts' },
                          h('li', null, t('shortcut.open')),
                          h('li', null, t('shortcut.undo')),
                          h('li', null, t('shortcut.redo')),
                          h('li', null, t('shortcut.export')),
                          h('li', null, t('shortcut.paste')),
                          h('li', null, t('shortcut.escape'))
                        )
                      ),
                      h(
                        'section',
                        { className: 'ie-section' },
                        h(
                          'div',
                          { className: 'ie-crop-info' },
                          t('tip.local')
                        )
                      )
                    )
              )
            )
          ),
          h(
            'footer',
            { className: 'ie-statusbar' },
            h(
              'div',
              { className: 'ie-status-left' },
              doc ? h('span', null, statusSize) : h('span', null, t('empty.hint')),
              doc ? h('span', null, statusHistory) : null
            ),
            notice
              ? h('span', { className: 'ie-notice', 'data-error': noticeError }, notice)
              : null
          ),
          h('input', {
            ref: fileRef,
            type: 'file',
            accept: 'image/*',
            style: { display: 'none' },
            onChange: (event) => {
              const file = event.target.files && event.target.files[0];
              if (file) openFile(file);
              event.target.value = '';
            },
          })
        )
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, 'zh', zh), 'image-editor: zh dictionary');
        ctx.effect(() => ctx.locale.register(NS, 'en', en), 'image-editor: en dictionary');
        const t = ctx.locale.bind(NS);
        ctx.slots.inject('main', () =>
          ctx.slots.register(
            { name: 'main', key: PANEL_ID, locale: NS },
            ImageEditorPage
          )
        );
        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: 30,
              locale: NS,
              label: () => t('panel.label'),
            },
            EditorIcon
          )
        );
      },
    };
  },
});
