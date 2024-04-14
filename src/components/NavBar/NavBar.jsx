// this will hold the navbar
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "../../services/users.js";
import logo from "../../../public/Riff.png"
import "./NavBar.css";

function NavBar({ user, setUser }) {
  // navigate function
  const navigate = useNavigate();

  // const [profLink, setProfLink] = useState("");
  
  // get user data
  // useEffect(() => {
  //   const getUserData = async () => {
  //     const usr = await user.profile_obj;
  //     setProfLink(
  //       usr.profilePic
  //     );

  //   }
  //   getUserData();  
  // }, [user]);

  // this is sign out function
  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    navigate("/login");
  };


  return (
    <div id="mainContainer-NavBar">
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "link-NavBar active-Link-NavBar" : "link-NavBar"
        }
      >
        <div
          id="profPic-container-NavBar" 
          style={{ backgroundImage: `url(${user?.profile_obj?.profilePic})` }}
          alt="your profile pic"
        ></div>
      </NavLink>

      
      <div id="linkContainer-NavBar">
        <div id="logoNavContainer-NavBar">
          <img id="logo-img-NavBar" src={logo} alt="Riff app logo" />
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-NavBar active-Link-NavBar" : "link-NavBar"
          }
          to="/"
        >
          Main
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? "link-NavBar active-Link-NavBar" : "link-NavBar"
          }
          to="/fav-feed"
        >
          Main Fav
        </NavLink>

        <div onClick={handleSignOut} className="link-NavBar">Sign Out</div>
      </div>
    </div>
  );
}

export default NavBar;
