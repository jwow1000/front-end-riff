// this will hold the navbar
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar({user}) {
  return (
    <div id="mainContainer-NavBar">
      <NavLink 
        id="userProf-NavBar"
        className={({ isActive }) => (isActive ? 'link-NavBar active-Link-NavBar' : 'link-NavBar' )}        
        to="/user"
      >
        <img 
          src={user.profile_pic}
          alt="your user image" 
          id="logoImg-NavBar"
        />
        {user.username}
      </NavLink>

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
  )
}

export default NavBar