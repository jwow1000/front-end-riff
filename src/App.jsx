import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { verifyUser, getProfile } from "./services/users.js";
import Feed from "./pages/Feed/Feed.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import "./App.css";

function App() {
  const navigate = useNavigate();
  
  // get current path location to render navbar(layout) or not
  const location = useLocation();
  const { pathname } = location;
  
  // define user state to pass down and verify
  const [user, setUser] = useState({});

  // fetch the user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      if (user) {
        const temp = getProfile(user.id);
        setUser(temp);
        console.log('we got a user');
      } else {
        setUser(null);
        navigate("login/");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {
        (pathname === '/login/' || pathname === '/register/') ?
          null
        :
        <Layout user={user} setUser={setUser} />
      }
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        
        <Route path="/main-feed" element={<Feed user={user} feedType={'main'} />} />
        <Route path="/fav-feed" element={<Feed user={user} feedType={'fav'} />} />
d      </Routes>
    </div>
  );
}
export default App;
