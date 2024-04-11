import {Route, Routes} from 'react-router-dom';
import Feed from './pages/Feed/Feed.jsx';
import './App.css';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Thread from './pages/Thread/Thread.jsx';

function App() {


  return (
    <div>
     <Routes>
        <Route path="/" element={ <Feed /> }/>
        <Route path="/login"element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="thread" element={<Thread/>}/>
      </Routes>



    </div>
  )
}

export default App
