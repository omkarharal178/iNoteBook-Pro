import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

    const[alert,setAlert]=useState(null);
    const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

    // Light and Dark Mode
  
    const [mode, setMode] = useState('light');
    const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#212529';
      // showAlert('Dark mode has been enabled', 'success');
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      // showAlert('Light mode has been enabled', 'success');
    }
  };

    return (
        <NoteState>
            <Router> 
                <Navbar mode={mode} toggleMode={toggleMode}  />
                <Alert alert={alert} />
                <div className='container'>
                <Routes>
                    <Route path="/" element={<Home  showAlert={showAlert} mode={mode} toggleMode={toggleMode}/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
                    <Route path="/signup" element={<Signup showAlert={showAlert} mode={mode} toggleMode={toggleMode} />} />
                </Routes>
                </div>
            </Router>
        </NoteState>
    );
}

export default App;
