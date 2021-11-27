import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LoginPresenter from './presenters/LoginPresenter'
import AboutPresenter from './presenters/AboutPresenter'
import RegisterPresenter from './presenters/RegisterPresenter'
import Error from './components/Error/Error'

function App() {



  const login = async () => {

  }

  const logout = async () => {

  }



  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPresenter/>}/>
        <Route path="/about" element={<AboutPresenter/>}/>
        <Route path="/register" element={<RegisterPresenter/>}/>
        <Route path="*" element={<Error/>}/>  {/*catch all*/}
      </Routes>
    </Router>
  );
}

export default App;
