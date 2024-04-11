// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import { getProfile } from '../../services/users.js';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import './PostPreview.css';

function PostPreview( {post, width, height} ) {
  const [postData, setPostData] = useState({});
  const [postUser, setPostUser] = useState({});

  // get post data and user data nested
  useEffect(() => {
    // function to get post object
    const getUserData = async (id) => {
      const data = await getProfile(id);
      setPostUser(data);
    }
    const getPostData = async () => {
      const posti = await post;
      setPostData( posti );
      getUserData( posti.author );
    }
    
    getPostData();  
  }, [post]);

  const handleClick = () => {
    console.log("i've been clicked");
  }
  
  return (
    <div 
      id="mainContainer-PostPreview"
      style={{
        'width': width,
        'height': height,
        'backgroundImage': `linear-gradient(rgba(45,255,196,0.2), rgba(15, 15, 100, 0.5)), url(${postData.image})`
      }}
      onClick={handleClick}
    >
      <div className='sidebarBg-PostPreview'>
        <div 
            id="profPic-PostPreview"
            style={{'backgroundImage': `url(${postUser.profilePic})`}}
            alt="your profile pic"
          > 
        </div>
      </div>
      
      <div className='sidebarBg-PostPreview'>
          <LikeButton state={false} width={'5rem'} />
          <FollowButton state={false} width={'5rem'}/>
      </div>
    </div>
  )
}

export default PostPreview  