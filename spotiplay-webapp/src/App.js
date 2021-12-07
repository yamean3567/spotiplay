import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPresenter from './presenters/LoginPresenter'
import AboutPresenter from './presenters/AboutPresenter'
import RegisterPresenter from './presenters/RegisterPresenter'
import Error from './components/Error/Error'
import Home from './components/Home/Home'
import RequireAuth from './components/Auth/RequireAuth';
import RequireNoAuth from './components/Auth/RequireNoAuth';
import { AuthProvider } from './contexts/auth';
import LyricsGuesserPresenter from './presenters/LyricsGuesserPresenter';
import HigherLowerPresenter from './presenters/HigherLowerPresenter';
import TopPresenter from './presenters/TopPresenter';
import LeaderboardPresenter from './presenters/LeaderboardPresenter';

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
          <Route path="/home/guessthelyrics" element={
            <RequireAuth>
              <LyricsGuesserPresenter />
            </RequireAuth>
          }/>
          <Route path="/home/higherlower" element={
            <RequireAuth>
              <HigherLowerPresenter />
            </RequireAuth>
          }/>
          <Route path="/home/top" element={
            <RequireAuth>
              <TopPresenter />
            </RequireAuth>
          }/>
          <Route path="/home/leaderboard" element={
            <RequireAuth>
              <LeaderboardPresenter />
            </RequireAuth>
          }/>
          <Route path="*" element={<Error/>}/>  {/*catch all*/}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
