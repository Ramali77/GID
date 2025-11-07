const drawingApps = [];

class DrawingApp {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;

    this.init();
  }

  init() {
    // Устанавливаем размеры canvas
    this.setCanvasSize();

    // Инициализируем фон
    this.drawBackground();

    // Настраиваем события
    this.setupEventListeners();

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
      this.setCanvasSize();
      this.redraw();
    });
  }

  setCanvasSize() {
    // Устанавливаем размеры canvas (можно настроить под свои нужды)
    this.canvas.width = this.canvas.getBoundingClientRect().width;
    this.canvas.height = this.canvas.getBoundingClientRect().height;
  }

  drawBackground() {
    // Заливаем синим фоном
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setupEventListeners() {
    // События мыши
    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stopDrawing());
    this.canvas.addEventListener('mouseout', () => this.stopDrawing());

    // События касания для мобильных устройств
    this.canvas.addEventListener('touchstart', (e) =>
      this.startDrawing(e.touches[0])
    );
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.draw(e.touches[0]);
    });
    this.canvas.addEventListener('touchend', () => this.stopDrawing());
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  startDrawing(e) {
    this.isDrawing = true;
    const pos = this.getMousePos(e);
    [this.lastX, this.lastY] = [pos.x, pos.y];
  }

  draw(e) {
    if (!this.isDrawing) return;

    const pos = this.getMousePos(e);

    this.ctx.beginPath();
    this.ctx.lineWidth = 7;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = 'white'; // Белый цвет рисования
    this.ctx.globalCompositeOperation = 'source-over';

    // Рисуем линию
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();

    [this.lastX, this.lastY] = [pos.x, pos.y];
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  clearCanvas() {
    // Сохраняем текущие настройки
    const currentFillStyle = this.ctx.fillStyle;

    // Очищаем canvas и рисуем заново фон
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();

    // Восстанавливаем настройки
    this.ctx.fillStyle = currentFillStyle;
  }

  redraw() {
    // Перерисовываем canvas при изменении размера
    this.drawBackground();
  }
}

function initBlock(block) {
  const video = block.querySelector('video');
  const canvas = block.querySelector('canvas');
  const drawingApp = new DrawingApp(canvas);
  drawingApps.push(drawingApp);

  block.addEventListener('mouseover', () => {
    video.play();
  });

  block.addEventListener('mouseout', () => {
    video.pause();
  });
}

function initClearButton() {
  const button = document.getElementById('clearBtn');

  button.addEventListener('click', () => {
    drawingApps.forEach((drawingApp) => {
      drawingApp.clearCanvas();
    });
  });
}

function init() {
  const blocks = document.querySelectorAll('.block');
  const blocks1 = document.querySelectorAll('.block1');

  blocks.forEach((block) => {
    initBlock(block);
  });

  blocks1.forEach((block) => {
   const video = block.querySelector('video');
   const canvas = block.querySelector('canvas');

  block.addEventListener('mouseover', () => {
    video.play();
  });

  block.addEventListener('mouseout', () => {
    video.pause();
  });
  });
}

// Инициализация приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
  init();
  initClearButton();
});
