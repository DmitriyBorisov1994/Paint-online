import React from 'react'
import './../styles/toolbar.scss'
import toolState from '../store/toolState'
import { Form } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup';
import { observer } from 'mobx-react-lite'
import { BsZoomIn, BsZoomOut } from "react-icons/bs";

const Settings = observer(() => {

   const changeColor = (e: React.ChangeEvent<any>) => {
      toolState.setFillColor(e.target.value)
      toolState.setStrokeColor(e.target.value)
   }

   return (
      <div className='setting-bar'>
         <InputGroup size='sm' style={{ maxWidth: '800px' }}>
            <InputGroup.Text>Толщина линии:</InputGroup.Text>
            <Form.Control
               type='number'
               style={{ width: '100px' }}
               defaultValue={1}
               min={1}
               max={50}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => toolState.setLineWidth(Number(e.target.value))}
            />
            <InputGroup.Text>px</InputGroup.Text>
            <InputGroup.Text>Цвет:</InputGroup.Text>
            <Form.Control
               onChange={(e) => changeColor(e)}
               type='color'
               value={toolState.fillColor.toString()}
            />
            <InputGroup.Text>Цвет обводки:</InputGroup.Text>
            <Form.Control
               type='color'
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => toolState.setStrokeColor(e.target.value)}
               value={toolState.strokeColor.toString()}
            />
            <InputGroup.Text><BsZoomOut /></InputGroup.Text>
            <InputGroup.Text>
               <Form.Range
                  min={1}
                  max={5}
                  step={0.5}
                  style={{ width: '200px' }}
               />
            </InputGroup.Text>
            <InputGroup.Text><BsZoomIn /></InputGroup.Text>
         </InputGroup>
      </div>
   )
})

export default Settings