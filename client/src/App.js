import React, {useState, useEffect} from 'react';
import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from  '../src/features/user'
import { login, logout } from  '../src/features/user'
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserFeatures from './components/UserFeatures';
import UserProfile from './components/UserProfile';
import OtherProfile from './components/OtherProfile';
import Conversations from './components/Conversations';
import Conversation from './components/Conversation'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({});
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
   fetch("/conversations")
      .then((r) => r.json())
      .then((data) => {
         setConversations(data);
      });
}, []);

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

 const handleCreateConversation = (id) => {
   fetch("/conversations", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({author_id: user.id, receiver_id: id})
   }).then((r) => r.json()
   .then((conversation) => {
      navigate(`/messages/${conversation.id}`)
   }));
 }


 const handleConversation = (id) => {
   navigate(`/messages/${id}`)
 }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login navigate={navigate}/>} />
        <Route path="/signup" element={<SignUp navigate={navigate}/>} />
        <Route path="/myprofile" element={<UserProfile handleSignOut={handleSignOut}/>} />
        <Route path="/features" element={<UserFeatures handleSignOut={handleSignOut} users={users} handleProfileClick={handleProfileClick} handleCreateConversation={handleCreateConversation}/>} />
        <Route path="/profile/:id" element={<OtherProfile handleSignOut={handleSignOut} profile={profile}/>}/>
        <Route path="/messages" element={<Conversations handleSignOut={handleSignOut} conversations={conversations} handleConversation={handleConversation}/>} />
        <Route path="/messages/:id" element={<Conversation conversations={conversations}/>} />
      </Routes>
    </div>
  );
}

export default App;
