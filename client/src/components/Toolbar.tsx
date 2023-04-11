import './../styles/toolbar.scss'
import { IoBrushSharp, IoSquare, IoRadioButtonOffOutline, IoArrowUndoCircleOutline, IoArrowRedoCircleOutline, IoSaveOutline } from "react-icons/io5";
import { BsFillEraserFill } from "react-icons/bs";
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';
import Brush from '../tools/brush';
import Rect from '../tools/rect';
import Circle from '../tools/circle';
import Rubber from '../tools/rubber';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Toolbar = () => {

   const setTool = (toolName: 'brush' | 'rect' | 'circle' | 'rubber') => {
      if (canvasState.socket && canvasState.sessionId) {
         switch (toolName) {
            case 'brush': toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))
            case 'rect': toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))
            case 'circle': toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))
            case 'rubber': toolState.setTool(new Rubber(canvasState.canvas, canvasState.socket, canvasState.sessionId))
         }
      }
   }

   const downloadImage = () => {
      const dataURL = canvasState.canvas?.toDataURL()
      const a = document.createElement('a')
      a.hidden = true
      if (dataURL) a.href = dataURL
      a.download = canvasState.sessionId + ".jpg"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
   }

   return (
      <div className='toolbar'>
         <h1 className="display-3 text-dark fw-bold">drawer</h1>
         <ButtonGroup>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => setTool('brush')}><IoBrushSharp /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => setTool('rect')}><IoSquare /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => setTool('circle')}><IoRadioButtonOffOutline /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => setTool('rubber')}><BsFillEraserFill /></Button>
         </ButtonGroup>
         <ButtonGroup>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => canvasState.undo()}><IoArrowUndoCircleOutline /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => canvasState.redo()}><IoArrowRedoCircleOutline /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => downloadImage()}><IoSaveOutline /></Button>
         </ButtonGroup>
      </div>
   )
}

export default Toolbar