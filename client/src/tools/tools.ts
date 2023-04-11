export default class Tool {
   canvas;
   ctx;
   socket;
   sessionId
   constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, sessionId: string) {
      if (canvas) {
         this.canvas = canvas
         this.ctx = canvas.getContext('2d')
         this.destroyEvents()
      }
      this.socket = socket
      this.sessionId = sessionId
   }

   set fillColor(color: string | CanvasGradient | CanvasPattern) {
      if (this.ctx) this.ctx.fillStyle = color
   }

   set strokeColor(color: string | CanvasGradient | CanvasPattern) {
      if (this.ctx) this.ctx.strokeStyle = color
   }

   set setLineWidth(width: number) {
      if (this.ctx) this.ctx.lineWidth = width
   }

   destroyEvents() {
      if (this.canvas) {
         this.canvas.onmousemove = null
         this.canvas.onmousedown = null
         this.canvas.onmouseup = null
      }

   }
}