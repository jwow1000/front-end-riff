// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import { getProfile } from '../../services/users.js';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import './PostPreview.css';

function PostPreview( {post, width, height} ) {
  const [postData, setPostData] = useState({});
  const [postUser, setPostUser] = useState({});

  // get post data
  useEffect(() => {
    // function to get post object
    const getPostData = async () => {
      const posti = await post;
      setPostData( posti );
      console.log('postData', postData);
    }
    // function to get user by post
    const getUserData = async () => {
      const userData = await getProfile(postData.author);
      setPostUser(userData);
    }
    
    getPostData();  
    getUserData();
  }, [post]);

  console.log('post data', postData);
  
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
            style={{'backgroundImage': `url(${postUser.image})`}}
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