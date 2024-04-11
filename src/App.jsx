import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { verifyUser } from "./services/users.js";
import Feed from "./pages/Feed/Feed.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
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
        setUser(user);
      } else {
        setUser(null);
        navigate("login/");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Layout user={user} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </div>
  );
}
export default App;
