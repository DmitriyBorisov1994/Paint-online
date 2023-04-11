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
import Rect from '../tools/rect'

const Canvas = observer(() => {

   const canvasRef = useRef<HTMLCanvasElement>(null)
   const userNameRef = useRef<HTMLInputElement>(null)

   const { id } = useParams()

   useEffect(() => {
      canvasState.setCanvas(canvasRef.current)
   }, [])

   useEffect(() => {
      if (canvasState.userName && id) {
         const socket = new WebSocket(`ws://localhost:5000/`)
         console.log('подключение установлено' + socket)
         canvasState.setSocket(socket)
         console.log(canvasState.socket)
         canvasState.setSessionId(id)
         if (canvasRef.current && canvasState.socket && canvasState.sessionId) toolState.setTool(new Brush(canvasRef.current, canvasState.socket, canvasState.sessionId))
         socket.onopen = () => {
            socket.send(JSON.stringify({
               id,
               userName: canvasState.userName,
               method: 'connection'
            }))
         }
         socket.onmessage = (e) => {
            let msg = JSON.parse(e.data)
            console.log(msg)
            switch (msg.method) {
               case "connection":
                  console.log(`user ${msg.userName} is connected`)
                  break;
               case "draw":
                  drawHandler(msg)
                  break;
            }
         }
      }
   }, [canvasState.userName])


   const drawHandler = (msg: any) => {
      const figure = msg.figure
      const ctx = canvasRef.current?.getContext('2d')
      if (ctx)
         switch (figure.type) {
            case 'brush':
               Brush.draw(ctx, figure.x, figure.y)
               break;
            case 'rect':
               Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
               break;
            case 'finish':
               ctx.beginPath()
               break;
         }
   }

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
                  <Form.Control ref={userNameRef} type="text" placeholder="Введите ваше имя" required />
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
            ref={canvasRef} width={canvasRef.current?.parentElement?.clientWidth} height={canvasRef.current?.parentElement?.clientHeight}
            style={{ transform: `scale(${scale})` }}
         />
      </div>
   )
})

export default Canvas