import Tool from "./tools";

export default class Rect extends Tool {

   mouseDown: boolean = false
   startX: number = 0
   startY: number = 0
   saved: string | undefined
   width: number = 0
   height: number = 0

   constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, sessionId: string) {
      super(canvas, socket, sessionId)
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
      this.socket.send(JSON.stringify({
         method: 'draw',
         id: this.sessionId,
         figure: {
            type: 'rect',
            x: this.startX,
            y: this.startY,
            width: this.width,
            height: this.height,
            color: this.ctx?.fillStyle
         }
      }))
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
         this.draw(this.startX, this.startY, this.width, this.height)
      }
   }

   draw(x: number, y: number, w: number, h: number) {
      const img = new Image()
      if (this.saved) img.src = this.saved
      img.onload = () => {
         if (this.canvas && this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
         }
      }
   }
   static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.rect(x, y, w, h)
      ctx.fill()
      ctx.stroke()
   }

}