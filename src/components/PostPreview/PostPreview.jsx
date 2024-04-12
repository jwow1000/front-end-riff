// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getProfile } from '../../services/users.js';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import './PostPreview.css';

function PostPreview( {post, width, height, user} ) {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({});
  const [postUser, setPostUser] = useState({});

  const doILikeThis = () => {
    // map through likes
    for(let i=0; i<postData.likes; i++) {
      if(user.id === postData[i]) {
        return true;
      }
    }
    return false;
  }

  const doIFollowThisUser = () => {
    
  }

  // get post data and user data nested
  useEffect(() => {
    const getUserData = async (id) => {
      console.log('the author id', id);
      const tempData = await getProfile(id);
      console.log('am i triggered?')
      setPostUser(tempData);
    }
    
    const getPostAndUser = async () => {
      // wait for the post data to arrive
      const tempPost = await post;
      console.log('ugh',tempPost);
      setPostData(tempPost);
      getUserData(tempPost.author + 1); 
    }

    getPostAndUser();
    
  }, [post]);
  // check for follows
  
  console.log('what is going on with these objects',postData, postUser);
  // handle the body click
  const handleClick = () => {
    navigate(`thread/${postData.id}`);
  }
  
  return (
    <div 
      id="background-PostPreview"
      style={{
        'width': width,
        'height': height,
        'backgroundImage': `linear-gradient(rgba(45,255,196,0.2), rgba(15, 15, 100, 0.5)), url(${postData.image})`
      }}
    >
      <div
        id="centerClick-PostPreview"
        onClick={handleClick}
      >
      </div>
      <div id="mainContainer-PostPreview">
        
        <div className='sidebarBg-PostPreview'>
          <NavLink to={`/user/${postUser.id}`}>
            <div 
              id="profPic-PostPreview"
              style={{'backgroundImage': `url(${postUser.profilePic})`}}
              alt="your profile pic"
            > 
            </div>
          </NavLink>

          
          <FollowButton state={false} width={'5rem'}/>
        </div>
        
        <div className='sidebarBg-PostPreview'>
          <LikeButton
            userId={user.id}
            postId={postData.id} 
            state={doILikeThis} 
            width={'5rem'} 
          />
        </div>
      </div>
      
    </div>
  )
}

export default PostPreview    