import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
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
import "./Conversation.css"
import './App.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState({});
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([])
   
   useEffect(() => {
   if (user) {
     fetch("/conversations")
      .then((r) => r.json())
      .then((data) => {
         setConversations(data);
      });}
}, [user, messages]);

  useEffect(() => {
   if (user) {
    fetch("/featuredusers")
       .then((r) => r.json())
       .then((data) => {
          setUsers(data);
       });}
 }, [user]);

  useEffect(() => {
   if (user) {
    fetch("/me").then((r) => {
       if (r.ok) {
          r.json().then((user) => dispatch(login(user)))
       }
    });}
 }, []);


useEffect(() => {
   const profileStorage = window.localStorage.getItem("PROFILE"); setProfile(JSON.parse(profileStorage))
},[])
 
 useEffect(() => {
    window.localStorage.setItem("PROFILE", JSON.stringify(profile))
 },[profile])


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
      setConversations([...conversations, conversation])
      navigate(`/messages/${conversation.id}`)
   }));
 }

  return (
    <div style={{
      backgroundColor: '#3A6436',
      width: '100vw',
      height: '100vh'
    }}>
      <Routes>
        <Route path="/" element={user ? null : (<Login navigate={navigate}/>)} />
        <Route path="/signup" element={user ? null : (<SignUp navigate={navigate}/>)} />
        <Route path="/myprofile" element={user ? (<UserProfile handleSignOut={handleSignOut}/>) : null} />
        <Route path="/features" element={user ? (<UserFeatures handleSignOut={handleSignOut} users={users} handleProfileClick={handleProfileClick} handleCreateConversation={handleCreateConversation}/>) : null} />
        <Route path="/profile/:id" element={user ? (<OtherProfile handleSignOut={handleSignOut} profile={profile}/>) : null}/>
        <Route path="/messages" element={user ? (<Conversations handleSignOut={handleSignOut} conversations={conversations} />) : null} />
        <Route path="/messages/:id" element={user ? (<Conversation handleSignOut={handleSignOut} conversations={conversations} messages={messages} setMessages={setMessages}/>) : null} />
      </Routes>
    </div>
  );
}

export default App;
