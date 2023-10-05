import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Thanks } from './pages/Thanks';
import { Capture } from './pages/Capture';
import { Show } from './pages/Show';
import { LastChance } from './pages/LastChance';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank_you" element={<Thanks />} />
        <Route path='/capture' element={<Capture />} />
        <Route path='/show' element={<Show />} />
        <Route path ='/lastchance' element={<LastChance /> } /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
