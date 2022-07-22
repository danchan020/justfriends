import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login navigate={navigate}/>} />
        <Route path="/signup" element={<SignUp navigate={navigate}/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
