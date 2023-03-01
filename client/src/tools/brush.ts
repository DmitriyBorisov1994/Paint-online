import Tool from "./tools";

export default class Brush extends Tool {
   mouseDown: boolean = false
   constructor(canvas: HTMLCanvasElement | null) {
      super(canvas)
      this.listen()
   }

   listen() {
      if (this.canvas) {
         this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
         this.canvas.onmousedown = this.mouseDownHandler.bind(this)
         this.canvas.onmouseup = this.mouseUpHandler.bind(this)
      }

   }

   mouseUpHandler(e: MouseEvent) {
      this.mouseDown = false
   }
   mouseDownHandler(e: MouseEvent) {
      this.mouseDown = true
      this.ctx?.beginPath()
      this.ctx?.moveTo(e.offsetX, e.offsetY)
   }
   mouseMoveHandler(e: MouseEvent) {
      if (this.mouseDown) {
         this.draw(e.offsetX, e.offsetY)
      }
   }

   draw(x: number, y: number) {
      this.ctx?.lineTo(x, y)
      this.ctx?.stroke()
      console.log("draw")
   }
}