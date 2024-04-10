// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import styled from 'styled-components';
import './PostPreview.css';

const Small = styled.div`
  width: 1rem;
`;


function PostPreview( {post} ) {
  const [profileImg, setProfileImg] = useState("");
  const [postImg, setPostImg] = useState("");
  
  useEffect( () => {
    setProfileImg("https://www.hdwallpaper.nu/wp-content/uploads/2015/11/Spongebob_Squarepants_wallpaper_017.jpg");
    setPostImg("https://i.ytimg.com/vi/PuTBDeatxSM/maxresdefault.jpg");

  }, []);
  
  const handleClick = () => {
    console.log("i've been clicked");
  }
  
  return (
    <div 
      id="mainContainer-PostPreview"
      style={{
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
        <Small>
          <LikeButton />
          <FollowButton />
        </Small>
      </div>
    </div>
  )
}

export default PostPreview  