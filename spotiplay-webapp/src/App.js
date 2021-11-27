import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPresenter from './presenters/LoginPresenter'
import AboutPresenter from './presenters/AboutPresenter'
import RegisterPresenter from './presenters/RegisterPresenter'
import Error from './components/Error/Error'
import Home from './components/Home/Home'
import RequireAuth from './components/Auth/RequireAuth';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPresenter/>}/>
        <Route path="/about" element={<AboutPresenter/>}/>
        <Route path="/register" element={<RegisterPresenter/>}/>
        <Route path="/home" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }/>
        <Route path="/:pagename" element={<Error/>}/>  {/*catch all*/}
      </Routes>
    </Router>
  );
}

export default App;
