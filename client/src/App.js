import logo from './logo.svg';
import './App.css';
import Home from "./component/navbar/Home"
import { Route, Routes } from 'react-router-dom';
import About from './component/navbar/About';
import Work from './component/navbar/Work';
import NotFound from './component/navbar/NotFound';
import Navbar from './component/navbar/Navbar';
import Login from './component/login/Login';
import Signup from './component/login/Signup';
import { useState } from 'react';

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  return (
    <div className="App ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<div>{<Home />}</div>} />
        <Route path="/About" element={<div>{<About />}</div>} />
        <Route path="/Work" element={<div>{<Work />}</div>} />
        <Route path="/Login" element={<div>{<Login />}</div>} />
        <Route path="/Signup" element={<div>{<Signup />}</div>} />
        <Route path="/Signup" element={<div>{<Signup />}</div>} />
        <Route path="/*" element={<div>{<NotFound />}</div>} />
      </Routes>
    </div>
  );
}

export default App;
