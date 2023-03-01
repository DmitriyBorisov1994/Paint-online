import Tool from "./tools";

export default class Circle extends Tool {

   mouseDown: boolean = false
   startX: number = 0
   startY: number = 0
   saved: string | undefined
   width: number = 0
   height: number = 0

   constructor(canvas: HTMLCanvasElement | null) {
      super(canvas)
      this.listen()
      this.saved = this.canvas?.toDataURL()
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
      this.startX = e.offsetX;
      this.startY = e.offsetY;
      this.saved = this.canvas?.toDataURL()
   }

   mouseMoveHandler(e: MouseEvent) {
      if (this.mouseDown) {
         let currentX = e.offsetX;
         let currentY = e.offsetY;
         this.width = currentX - this.startX;
         this.height = currentY - this.startY;
         let r = Math.sqrt(this.width ** 2 + this.height ** 2)
         this.draw(this.startX, this.startY, r)
      }
   }

   draw(x: number, y: number, r: number) {
      const img = new Image()
      if (this.saved) img.src = this.saved
      img.onload = () => {
         if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
         }
      }
   }
}