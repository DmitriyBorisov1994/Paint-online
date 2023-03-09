import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Canvas from './components/Canvas'
import Settings from './components/Settings'
import Toolbar from './components/Toolbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss'
import { uid } from 'uid'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/:id' element={<>
            <Toolbar />
            <Settings />
            <Canvas />
          </>} />
          <Route path='/' element={<Navigate to={`id_${uid(8)}`} />} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
