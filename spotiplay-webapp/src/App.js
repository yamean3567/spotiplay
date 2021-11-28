import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPresenter from './presenters/LoginPresenter'
import AboutPresenter from './presenters/AboutPresenter'
import RegisterPresenter from './presenters/RegisterPresenter'
import Error from './components/Error/Error'
import Home from './components/Home/Home'
import RequireAuth from './components/Auth/RequireAuth';
import RequireNoAuth from './components/Auth/RequireNoAuth';
import { AuthProvider } from './contexts/auth';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
          <RequireNoAuth>
            <LoginPresenter/>
          </RequireNoAuth>
          }/>
          <Route path="/about" element={
          <RequireNoAuth>
            <AboutPresenter/>
          </RequireNoAuth>
          }/>
          <Route path="/register" element={
          <RequireNoAuth>
            <RegisterPresenter/>
          </RequireNoAuth>
          }/>
          <Route path="/home" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }/>
          <Route path="*" element={<Error/>}/>  {/*catch all*/}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
