import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPresenter from './presenters/LoginPresenter'
import AboutPresenter from './presenters/AboutPresenter'
import RegisterPresenter from './presenters/RegisterPresenter'
import Error from './components/Error/Error'
import Home from './components/Home/Home'
import RequireAuth from './components/Auth/RequireAuth';
import { useAuth } from './contexts/auth';

function App() {
  const auth = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth.currentUser !== null ? <Navigate to="/home"/> : <LoginPresenter/>}/>
        <Route path="/about" element={<AboutPresenter/>}/>
        <Route path="/register" element={auth.currentUser !== null ? <Navigate to="/home"/> : <RegisterPresenter/>}/>
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
