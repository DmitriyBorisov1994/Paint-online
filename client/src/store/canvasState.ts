import { makeAutoObservable } from "mobx";

class CanvasState {
   canvas: HTMLCanvasElement | null = null
   undoList: string[] = []
   redoList: string[] = []
   userName: string = ''
   constructor() {
      makeAutoObservable(this)
   }
   setCanvas(canvas: any) {
      this.canvas = canvas
   }
   pushToUndo(data: string) {
      this.undoList.push(data)
   }
   pushToRedo(data: string) {
      this.redoList.push(data)
   }
   setUserName(name: string) {
      this.userName = name
   }
   undo() {
      if (this.canvas) {
         let ctx = this.canvas.getContext('2d')
         if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop() //as any // TypeScript ругается на конвертацию String в CanvasImageSource
            let img = new Image()
            if (dataUrl) {
               this.redoList.push(this.canvas.toDataURL())
               img.src = dataUrl
               img.onload = () => {
                  if (this.canvas) {
                     ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                     ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                  }
               }
            }

         } else {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
         }
      }

   }
   redo() {
      if (this.canvas) {
         let ctx = this.canvas.getContext('2d')
         if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop() //as any // TypeScript ругается на конвертацию String в CanvasImageSource
            let img = new Image()
            if (dataUrl) {
               this.undoList.push(this.canvas.toDataURL())
               img.src = dataUrl
               img.onload = () => {
                  if (this.canvas) {
                     ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                     ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                  }
               }
            }

         }
      }
   }
}

export default new CanvasState()