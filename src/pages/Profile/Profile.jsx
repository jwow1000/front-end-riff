// this is the usr profile page
import { useState, useEffect } from "react";
import { getProfile, editProfile, getUserPostsById } from "../../services/users.js";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import "./Profile.css";

function Profile({ user }) {
  const [profilePic, setProfilePic] = useState(user?.profile_obj?.profilePic);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editProfile(user?.user_obj?.id, { profilePic });
    location.reload();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setProfilePic(value);
  };

  //logic for getting all user posts
  const [posts, setPosts] = useState([]);
  
  useEffect(()=> {
    const fetchPosts = async() => {
      const data = await getUserPostsById(user?.profile_obj?.id)
      setPosts(data)
    }
    fetchPosts()
  },[user])

  return (
    <div className="profile-page">
      <div className="user-banner">
        <h1 className="username-banner">{user?.user_obj?.username}</h1>
        <img className="large-profile" src={user?.profile_obj?.profilePic} />
        <h3 className="form-name">Change Profile Pic</h3>
        <form className='profpic-form' onSubmit={handleSubmit}>
          <label className="pic-label">
            Edit:
            <input
              className="pic-input"
              type="text"
              value={profilePic}
              name="profilePic"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </div>
      <div className='profile-feed'>
        <h1>My Posts</h1>
        {
          posts && posts.map((posts, idx) => (
            <PostPreview 
              post={posts} 
              user={user}
              key={idx}
              width={`80%`}
              height={`25rem`}/>
          ))
        }

      </div>
    </div>
  );
}

export default Profile;
