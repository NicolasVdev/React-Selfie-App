import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Thanks } from './pages/Thanks';
import { Capture } from './pages/Capture'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank_you" element={<Thanks />} />
        <Route path='/capture' element={<Capture />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
