import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { verifyUser, getProfile } from "./services/users.js";
import Feed from "./pages/Feed/Feed.jsx";
import Profile from "./pages/Profile/Profile.jsx"
import Layout from "./components/Layout/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Thread from "./pages/Thread/Thread.jsx";
import Register from "./pages/Register/Register.jsx";
import AddPost from "./components/AddPost/AddPost.jsx"
// import "./App.css";

function App() {
  const navigate = useNavigate();
  
  // get current path location to render navbar(layout) or not
  const location = useLocation();
  const { pathname } = location;
  
  // define user state to pass down and verify
  const [user, setUser] = useState([]);
  
  // function to hide layout
  const hideLayout = (path) => {
    if(path !== '/login/' && path !== '/register') {
      return <Layout user={user} setUser={setUser} />

    } 
  }

  // fetch the user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      if (user) {
        const temp = getProfile(user.id);
        setUser({
          'user_obj': user,
          'profile_obj': temp
        });
        console.log('we got a user');
      } else {
        setUser(null);
        navigate("login/");
      }
    };

    fetchUser();
  }, []);
  // console.log('check it out', user)
  
  return (
    <div id="full-page">
      {
        hideLayout(pathname)
      }
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        
        { user && (
          <>
            <Route path="/" element={<Feed user={user} feedType={'main'} />} />
            <Route path="/fav-feed" element={<Feed user={user} feedType={'fav'} />} />
            <Route path="/thread/:id" element={<Thread user={user} />} />
            <Route path="/profile" element={<Profile user={user}/>} />
          </>
          )
        }

      </Routes>
    </div>
  );
}

export default App;
