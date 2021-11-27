import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import About from './components/Start/About'
import Login from './components/Start/Login'
import Register from './components/Start/Register'
import Error from './components/Error/Error'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<Error/>}/>  {/*catch all*/}
      </Routes>
    </Router>
  );
}

export default App;
