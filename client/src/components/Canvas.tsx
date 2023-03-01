import React, { useEffect, useRef } from 'react'
import './../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/brush'

const Canvas = observer(() => {

   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
      canvasState.setCanvas(canvasRef.current)
      if (canvasRef.current) toolState.setTool(new Brush(canvasRef.current))
   }, [])

   const mouseDownHandler = () => {
      if (canvasRef.current) {
         canvasState.pushToUndo(canvasRef.current.toDataURL())
      }

   }


   return (
      <div className='canvas'>
         <canvas onMouseDown={() => { mouseDownHandler() }} ref={canvasRef} width={600} height={400} />
      </div>
   )
})

export default Canvas