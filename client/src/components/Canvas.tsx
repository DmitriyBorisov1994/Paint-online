import React, { useEffect, useRef, useState } from 'react'
import './../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/brush'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
const Canvas = observer(() => {

   const canvasRef = useRef<HTMLCanvasElement>(null)
   const userNameRef = useRef<HTMLInputElement>(null)

   const { id } = useParams()

   useEffect(() => {
      canvasState.setCanvas(canvasRef.current)
      if (canvasRef.current) toolState.setTool(new Brush(canvasRef.current))
   }, [])

   useEffect(() => {
      if (canvasState.userName) {
         const socket = new WebSocket(`ws://localhost:5000/`)
         console.log('подключение установлено')
         socket.onopen = () => {
            socket.send(JSON.stringify({
               id,
               userName: canvasState.userName,
               method: 'connection'
            }))
         }
         socket.onmessage = (e) => {
            console.log(e.data)
         }
      }
   }, [canvasState.userName])


   const mouseDownHandler = () => {
      if (canvasRef.current) {
         canvasState.pushToUndo(canvasRef.current.toDataURL())
      }

   }

   const [show, setShow] = useState(true);
   const [scale, setScale] = useState(1)

   const handleClose = () => setShow(false);
   //const handleShow = () => setShow(true);

   const connectionHandler = () => {
      if (userNameRef.current) canvasState.setUserName(userNameRef.current.value)
      handleClose()
   }


   return (
      <div className='canvas'>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Введите ваше имя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Label>Ваше имя:</Form.Label>
                  <Form.Control ref={userNameRef} type="text" placeholder="Введите ваше имя" />
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={connectionHandler}>
                  Войти
               </Button>
            </Modal.Footer>
         </Modal>
         <canvas
            onMouseDown={() => { mouseDownHandler() }}
            ref={canvasRef} width={800} height={400}
            style={{ transform: `scale(${scale})` }}
         />
      </div>
   )
})

export default Canvas