class Renderer {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.translate(0.5, 0.5);
    
    this.addBindings();
    this.addListeners();
    this.updateCanvasSize();
  }
  
  addBindings() {
    this.updateCanvasSize = this.updateCanvasSize.bind(this);
  }

  addListeners() {
    window.addEventListener('resize', this.updateCanvasSize);
  }

  updateCanvasSize() {
    const width = 80 * window.innerWidth / 100;
    const height = 100 * window.innerHeight / 100;
    this.canvas.width = this.canvas.style.width = width;
    this.canvas.height = this.canvas.style.height = height;
  }
}

new Renderer();