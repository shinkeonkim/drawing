class Renderer {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.translate(0.5, 0.5);
    
    this.drawing = false;
    this.lineWidth = 30;
    this.strokeStyle = 'black';
    this.lineCap = 'round';
    
    this.addBindings();
    this.addListeners();
    this.updateCanvasSize();
  }
  
  addBindings() {
    this.updateCanvasSize = this.updateCanvasSize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.draw = this.draw.bind(this);
  }

  addListeners() {
    window.addEventListener('resize', this.updateCanvasSize);


    this.canvas.addEventListener("mousedown", this.handleMouseDown); // 드로잉 끝
    this.canvas.addEventListener("mouseup", this.handleMouseUp); // 드로잉 대기
    this.canvas.addEventListener("mousemove", this.draw);
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
  }

  draw(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (!this.drawing) return;


    this.ctx.moveTo(x, y);
    this.ctx.beginPath();
    this.ctx.lineTo(x, y);
    this.ctx.stroke();  
  }
}

new Renderer();
