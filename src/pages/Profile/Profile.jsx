// this is the usr profile page
import { useState, useEffect } from 'react';
import { getProfile, editProfile } from '../../services/users.js';
import './Profile.css';


function Profile({user}) {

  const [profile, setProfile] = useState({})

  useEffect(() => {
    const getUserData = async (id) => {
      const profile = await getProfile(user.id);
      setProfile(profile)
    }
    getUserData()
  },[])

  const changeProfile = async () => {
    
  }

  return (
    <div>
      <div className='user-banner'>
        <img className='large-profile' src={profile.profilePic}/>
        <p>{user.username}</p>
        {/* <button onClick={changeProfile}>Edit Profile</button> */}
      </div>

    </div>
  )
}

export default Profile