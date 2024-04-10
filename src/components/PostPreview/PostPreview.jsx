// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import './PostPreview.css';

function PostPreview( {post, width, height} ) {
  const [profileImg, setProfileImg] = useState("");
  const [postImg, setPostImg] = useState("");
  
  useEffect( () => {
    setProfileImg(post.profile_pic);
    setPostImg("https://i.ytimg.com/vi/PuTBDeatxSM/maxresdefault.jpg");

  }, []);
  
  const handleClick = () => {
    console.log("i've been clicked");
  }
  
  return (
    <div 
      id="mainContainer-PostPreview"
      style={{
        'width': width,
        'height': height,
        'backgroundImage': `linear-gradient(rgba(45,255,196,0.2), rgba(15, 15, 100, 0.5)), url(${postImg})`
      }}
      onClick={handleClick}
    >
      <div className='sidebarBg-PostPreview'>
        <div 
            id="profPic-PostPreview"
            style={{'backgroundImage': `url(${profileImg})`}}
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