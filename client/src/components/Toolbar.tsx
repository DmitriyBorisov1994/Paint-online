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
   return (
      <div className='toolbar'>
         <h1 className="display-3 text-dark fw-bold">drawer</h1>
         <ButtonGroup>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}><IoBrushSharp /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}><IoSquare /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => toolState.setTool(new Circle(canvasState.canvas))}><IoRadioButtonOffOutline /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => toolState.setTool(new Rubber(canvasState.canvas))}><BsFillEraserFill /></Button>
         </ButtonGroup>
         <ButtonGroup>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => canvasState.undo()}><IoArrowUndoCircleOutline /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn' onClick={() => canvasState.redo()}><IoArrowRedoCircleOutline /></Button>
            <Button size='lg' variant='outline-primary' className='toolbar_btn'><IoSaveOutline /></Button>
         </ButtonGroup>
      </div>
   )
}

export default Toolbar