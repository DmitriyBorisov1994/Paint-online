import { makeAutoObservable } from "mobx";
import Tool from "../tools/tools";

class ToolState {
   tool: Tool | null = null
   fillColor: string | CanvasGradient | CanvasPattern = 'black'
   strokeColor: string | CanvasGradient | CanvasPattern = 'black'
   width: number = 1
   constructor() {
      makeAutoObservable(this)
   }
   setTool(tool: Tool) {
      this.tool = tool
   }
   setFillColor(color: string | CanvasGradient | CanvasPattern) {
      if (this.tool) this.tool.fillColor = color
   }
   setStrokeColor(color: string | CanvasGradient | CanvasPattern) {
      if (this.tool) this.tool.strokeColor = color
   }
   setLineWidth(width: number) {
      if (this.tool) this.tool.setLineWidth = width
   }
}

export default new ToolState()