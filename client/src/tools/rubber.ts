import Brush from "./brush";

export default class Rubber extends Brush {
   mouseDown: boolean = false
   constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, sessionId: string) {
      super(canvas, socket, sessionId)
   }
   draw(x: number, y: number) {
      if (this.ctx) {
         this.ctx.lineTo(x, y)
         this.ctx.strokeStyle = 'white'
         this.ctx.stroke()
      }
   }
}