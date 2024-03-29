import Tool from "./tools";

export default class Brush extends Tool {
   mouseDown: boolean = false
   constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, sessionId: string) {
      super(canvas, socket, sessionId)
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
      console.log(this.socket)
      this.socket.send(JSON.stringify({
         method: 'draw',
         id: this.sessionId,
         figure: {
            type: 'finish',
         }
      }))
   }
   mouseDownHandler(e: MouseEvent) {
      this.mouseDown = true
      this.ctx?.beginPath()
      this.ctx?.moveTo(e.offsetX, e.offsetY)
   }
   mouseMoveHandler(e: MouseEvent) {
      if (this.mouseDown) {
         //this.draw(e.offsetX, e.offsetY)
         this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
               type: 'brush',
               x: e.offsetX,
               y: e.offsetY
            }
         }))
      }
   }

   static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
      ctx?.lineTo(x, y)
      ctx?.stroke()
      console.log("draw")
   }
}