import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { verifyUser, getProfile } from "./services/users.js";
import { followsList } from "./services/follows.js";
import Feed from "./pages/Feed/Feed.jsx";
import Profile from "./pages/Profile/Profile.jsx"
import Layout from "./components/Layout/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Thread from "./pages/Thread/Thread.jsx";
import Register from "./pages/Register/Register.jsx";
// import "./App.css";

function App() {
  const navigate = useNavigate();
  
  // define user state to pass down and verify
  const [user, setUser] = useState([]);
  const [trigUser, setTrigUser] = useState(user);
  const [follows, setFollows] = useState([])
  
  // fetch the user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      if (user) {
        const temp = await getProfile(user.id);
        const followsData = await followsList(temp.id)
        console.log(followsData)
        setFollows(followsData)
        setUser({
          'user_obj': user,
          'profile_obj': temp
        });
      } else {
        setUser(null);
        navigate("/login");
      }
    };

    fetchUser();
  }, [trigUser]);

  
  return (
    <div id="full-page">
    
      {user && <Layout user={user} setUser={setUser} />}
      
      <Routes>
       
        <Route path="/login/" element={<Login setUser={setUser} setTrigUser={setTrigUser}/>} />
        <Route path="/register/" element={<Register setUser={setUser} setTrigUser={setTrigUser}/>} />
      
        
        { user && (
          
          <>
            <Route path="/" element={<Feed user={user} follows={follows} feedType={'main'} setTrigUser={setTrigUser}/>} />
            <Route path="/fav-feed" element={<Feed user={user} follows={follows} feedType={'fav'} setTrigUser={setTrigUser}/>} />
            <Route path="/thread/:id" element={<Thread user={user} />} />
            <Route path="/profile" element={<Profile user={user} follows={follows}/>} />
          </>
          )
        }

      </Routes>
    </div>
  );
}

export default App;
