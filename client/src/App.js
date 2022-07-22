import React, {useEffect} from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from  '../src/features/user'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("/me").then((r) => {
       if (r.ok) {
          r.json().then((user) => dispatch(login(user)))
       }
    });
 }, []);

 const handleSignOut = () => {
    fetch("/logout", { method: "DELETE" })
       .then((r) => {
          if (r.ok) {
            dispatch(logout());
          }
       })
       .then(navigate("/"));
 };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login navigate={navigate}/>} />
        <Route path="/signup" element={<SignUp navigate={navigate}/>} />
        <Route path="/home" element={<Home handleSignOut={handleSignOut}/>} />
      </Routes>
    </div>
  );
}

export default App;
