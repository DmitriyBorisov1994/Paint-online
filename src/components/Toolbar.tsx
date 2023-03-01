import React from 'react'
import './../styles/toolbar.scss'
import { IoBrushSharp, IoSquare, IoRadioButtonOffOutline, IoColorPaletteOutline, IoPencilOutline, IoArrowUndoCircleOutline, IoArrowRedoCircleOutline, IoSaveOutline } from "react-icons/io5";
import { GrErase } from "react-icons/gr";
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';
import Brush from '../tools/brush';
import Rect from '../tools/rect';
import Circle from '../tools/circle';
import Rubber from '../tools/rubber';

const Toolbar = () => {

   const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
      toolState.setFillColor(e.target.value)
      toolState.setStrokeColor(e.target.value)
   }

   return (
      <div className='toolbar'>
         <button className='toolbar_btn' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}><IoBrushSharp /></button>
         <button className='toolbar_btn' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}><IoSquare /></button>
         <button className='toolbar_btn' onClick={() => toolState.setTool(new Circle(canvasState.canvas))}><IoRadioButtonOffOutline /></button>
         <button className='toolbar_btn' onClick={() => toolState.setTool(new Rubber(canvasState.canvas))}><GrErase /></button>
         <input onChange={(e) => changeColor(e)} type='color' className='toolbar_btn' />
         <button className='toolbar_btn' style={{ marginLeft: 'auto' }} onClick={() => canvasState.undo()}><IoArrowUndoCircleOutline /></button>
         <button className='toolbar_btn' onClick={() => canvasState.redo()}><IoArrowRedoCircleOutline /></button>
         <button className='toolbar_btn' style={{ marginRight: '10px' }}><IoSaveOutline /></button>
      </div>
   )
}

export default Toolbar