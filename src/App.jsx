import './App.css';
import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';



function App() {

  const [user, setUser] = useState(false);
  const [typeReg, setTypeReg] = useState(true)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome  />} />
        <Route path="/LogIn" element={<LogIn  user={user} setUser={setUser} typeReg={typeReg} setTypeReg={setTypeReg}/>} />
        <Route path="/SignUp" element={<SignUp  user={user} setUser={setUser} typeReg={typeReg} setTypeReg={setTypeReg}/>} />
        <Route path="/MainPage" element={<MainPage  user={user} setUser={setUser } typeReg={typeReg} setTypeReg={setTypeReg}/>} />
      </Routes>
    </Router>
  );
}

export default App;
