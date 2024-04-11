import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { verifyUser, getProfile} from "./services/users.js";
import Feed from "./pages/Feed/Feed.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import AddPost from "./components/AddPost/AddPost.jsx"
import "./App.css";

function App() {
  const navigate = useNavigate();

  // define user state to pass down and verify
  const [user, setUser] = useState(null);

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



  console.log(user)


  return (
    <div>
      <Layout user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/addpost" element={<AddPost user={user}/>}/>
        <Route path="/" element={<Feed />} />
      </Routes>
    </div>
  );
}
export default App;
