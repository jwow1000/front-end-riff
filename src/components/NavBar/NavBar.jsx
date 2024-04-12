// this will hold the navbar
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "../../services/users";
import "./NavBar.css";

function NavBar({ user, setUser }) {
  // navigate function
  const navigate = useNavigate();

  const [profLink, setProfLink] = useState("");
  
  // get user data
  useEffect(() => {
    const getUserData = async () => {
      const usr = await user.profile_obj;
      setProfLink(
        usr.profilePic
      );

    }
    getUserData();  
  }, [user]);

  // this is sign out function
  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    navigate("/login");
  };


  return (
    <div id="mainContainer-NavBar">
      <NavLink
        id="userProf-NavBar"
        className={({ isActive }) =>
          isActive ? "link-NavBar active-Link-NavBar" : "link-NavBar"
        }
        to="/profile"
      >
        <div
          id="profPic-container-NavBar"
          style={{ backgroundImage: `url(${profLink})` }}
          alt="your profile pic"
        ></div>
      </NavLink>
      
      <div id="linkContainer-NavBar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-NavBar active-Link-NavBar" : "link-NavBar"
          }
          to="/home/main-feed"
        >
          Main
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-NavBar active-Link-NavBar" : "link-NavBar"
          }
          to="/home/fav-feed"
        >
          Main Fav
        </NavLink>

        <div onClick={handleSignOut} className="link-NavBar">Sign Out</div>
      </div>
    </div>
  );
}

export default NavBar;
