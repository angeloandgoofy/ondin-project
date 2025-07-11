import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Game from './component/Game'
import Home from './component/home'
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route  path="/game" element={<Game/>}/>
      </Routes>
    </Router>
  )
}

export default App
