class Canvas {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.translate(0.5, 0.5);
    
    this.drawing = false;
    this.lineWidth = 30;
    this.strokeStyle = 'black';
    this.lineCap = 'round';
    this.lastX = null;
    this.lastY = null;
    
    this.addBindings();
    this.addListeners();
    this.updateCanvasSize();
  }
  
  addBindings() {
    this.updateCanvasSize = this.updateCanvasSize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.draw = this.draw.bind(this);
  }

  addListeners() {
    window.addEventListener('resize', this.updateCanvasSize);

    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  updateCanvasSize() {
    const width = 80 * window.innerWidth / 100;
    const height = 100 * window.innerHeight / 100;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  handleMouseDown () {
    this.drawing = true;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.lineCap;
    this.ctx.strokeStyle = this.strokeStyle;
  }

  handleMouseUp () {
    this.drawing = false;
    this.lastX = null;
    this.lastY = null;
  }

  handleMouseMove(e) {
    this.draw(e);

    this.lastX = e.offsetX;
    this.lastY = e.offsetY;
  }
  }

  draw(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (!this.drawing) return;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX || x, this.lastY || y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();  
  }
}

class Renderer {
  constructor() {
    this.canvas = new Canvas();

    this.lineWidthInput = document.getElementById('lineWidthInput');
    this.lineWidthInput.value = this.canvas.lineWidth;
    this.addBindings();
    this.addListeners();
  }
  
  addBindings() {
    this.handleChangeLineWidth = this.handleChangeLineWidth.bind(this);
  }

  addListeners() {
    this.lineWidthInput.addEventListener('change', this.handleChangeLineWidth);  
  }

  handleChangeLineWidth(e) {
    this.canvas.lineWidth = e.target.value;
  }
}

new Renderer();
