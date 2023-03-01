import Canvas from './components/Canvas'
import Settings from './components/Settings'
import Toolbar from './components/Toolbar'
import './styles/app.scss'

function App() {
  return (
    <div className="app">
      <Toolbar />
      <Settings />
      <Canvas />
    </div>
  )
}

export default App
