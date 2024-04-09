// this will hold the navbar
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './NavBar.css';


function NavBar({user}) {
  const [profLink, setProfLink] = useState("");
  
  useEffect( () => {
    setProfLink("https://www.hdwallpaper.nu/wp-content/uploads/2015/11/Spongebob_Squarepants_wallpaper_017.jpg")
  }, [])
  
  

  
  return (
    <div id="mainContainer-NavBar">
      <NavLink 
        id="userProf-NavBar"
        className={({ isActive }) => (isActive ? 'link-NavBar active-Link-NavBar' : 'link-NavBar' )}        
        to="/user"
      >
        <div 
          id="profPic-container-NavBar"
          style={{'backgroundImage': `url(${profLink})`}}
          alt="your profile pic"
        > 
        </div>
        
      </NavLink>
      <div id="linkContainer-NavBar">

        <NavLink 
          className={({ isActive }) => (isActive ? 'link-NavBar active-Link-NavBar' : 'link-NavBar' )}
          to="/main-feed"
        >
          Main 
        </NavLink>
        
        <NavLink 
          className={({ isActive }) => (isActive ? 'link-NavBar active-Link-NavBar' : 'link-NavBar' )}
          to="/user-feed"
        >
          Main Fav
        </NavLink>

        <NavLink 
          className={({ isActive }) => (isActive ? 'link-NavBar active-Link-NavBar' : 'link-NavBar' )}
          to="/user-feed"
        >
          {
            ('is user logged in?') ?
              'Sign Out' :
              'Sign In'
          }
        </NavLink>
      </div>

      
    </div>
  )
}

export default NavBar