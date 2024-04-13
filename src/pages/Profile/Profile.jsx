// this is the usr profile page
import { useState, useEffect } from "react";
import { getProfile, editProfile, getUserPostsById } from "../../services/users.js";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import "./Profile.css";

function Profile({ user }) {
  const [profile, setProfile] = useState({});
  const [thisUser, setThisUser] = useState({});

  //logic for profile banner
  useEffect(() => {
    const getUserData = async () => {
      const us = await user;
      setThisUser(us);
      console.log('user obj', us.user_obj)
      const profile = await getProfile(us.user_obj.id);
      setProfile(profile);
    };
    getUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile(thisUser.id, profile);
    location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  //logic for getting all user posts
  const [posts, setPosts] = useState([]);
  
  useEffect(()=> {
    const fetchPosts = async(id) => {
      const data = await getUserPostsById(profile?.id)
      setPosts(data)
    }
    fetchPosts()
  },[profile])

 console.log(posts)

  return (
    <div className="profile-page">
      <div className="user-banner">
        <h1>{thisUser?.username}</h1>
        <img className="large-profile" src={profile.profilePic} />
        <h3>Change Profile Pic</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Profile Pic:
            <input
              className="pic-input"
              type="text"
              value={profile.profilePic}
              name="profilePic"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className='profile-feed'>
        <h1>My Posts</h1>
        {
          posts && posts.map((posts, idx) => (
            <PostPreview 
              post={posts} 
              key={idx}
              width={`50%`}
              height={`25rem`}/>
          ))
        }

      </div>
    </div>
  );
}

export default Profile;
