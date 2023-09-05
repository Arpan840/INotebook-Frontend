
import React, { useState } from 'react';
import Navabar from './Navabar';
import { FiMoon, FiSun } from 'react-icons/fi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import NoteState from "./Context/Small Notes/NoteState";


import Login from './Login';
import SignUp from './SignUp';

function App() {
  const [mode, setMode] = useState("light")
  const [bg, setBg] = useState("white")
  const [text, setText] = useState("black")
  let [symbol, setSymbol] = useState(FiMoon)
  const changeMode = () => {
    if (mode === "light") {
      setText("white")
      setBg("#1E1E1E")
      setMode("dark")
      setSymbol(FiSun)
    }
    else {
      setText("black")
      setBg("white")
      setMode("light")
      setSymbol(FiMoon)
    }


  }
  return (
    <NoteState>
      <Router>

        <div className="App" style={{ backgroundColor: bg }}>
          <Navabar changeMode={changeMode} mode={mode} symbol={symbol} bg={bg} text={text}></Navabar>
          
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home text={text} mode={mode}></Home>}></Route>
              <Route path='/about' element={<About text={text} ></About>}></Route>
              <Route path='/login' element={<Login text={text}></Login>}></Route>
              <Route path='/signup' element={<SignUp text={text}></SignUp>}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
