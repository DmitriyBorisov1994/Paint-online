import { makeAutoObservable } from "mobx";
import Tool from "../tools/tools";

class ToolState {
   tool: Tool | null = null
   fillColor: string | CanvasGradient | CanvasPattern = '#1e88e5'
   strokeColor: string | CanvasGradient | CanvasPattern = '#43a047'
   width: number = 1
   constructor() {
      makeAutoObservable(this)
   }
   setTool(tool: Tool) {
      this.tool = tool
      this.setFillColor(this.fillColor)
      this.setStrokeColor(this.strokeColor)
   }
   setFillColor(color: string | CanvasGradient | CanvasPattern) {
      this.fillColor = color
      if (this.tool) this.tool.fillColor = color
   }
   setStrokeColor(color: string | CanvasGradient | CanvasPattern) {
      this.strokeColor = color
      if (this.tool) this.tool.strokeColor = color
   }
   setLineWidth(width: number) {
      if (this.tool) this.tool.setLineWidth = width
   }
}

export default new ToolState()