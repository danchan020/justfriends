import React, {useState, useEffect} from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from  '../src/features/user'
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserFeatures from './components/UserFeatures';
import UserProfile from './components/UserProfile';
import OtherProfile from './components/OtherProfile';
import Chats from './components/Chats';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("/featuredusers")
       .then((r) => r.json())
       .then((data) => {
          setUsers(data);
       });
 }, []);

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

 const handleProfileClick = (id) => {
    const selectedUser = users.find(user => user.id === id);
    setProfile(selectedUser);
    navigate(`/profile/${id}`)
 }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login navigate={navigate}/>} />
        <Route path="/signup" element={<SignUp navigate={navigate}/>} />
        <Route path="/myprofile" element={<UserProfile handleSignOut={handleSignOut}/>} />
        <Route path="/features" element={<UserFeatures handleSignOut={handleSignOut} users={users} handleProfileClick={handleProfileClick}/>} />
        <Route path="/chats" element={<Chats handleSignOut={handleSignOut}/>} />
        <Route path="/profile/:id" element={<OtherProfile handleSignOut={handleSignOut} profile={profile}/>}/>
      </Routes>
    </div>
  );
}

export default App;
