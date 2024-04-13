// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getProfile } from '../../services/users.js';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import { checkFollows } from '../../services/follows.js';
import './PostPreview.css';

function PostPreview( {post, width, height, user} ) {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({});
  const [postUser, setPostUser] = useState({});
  const [like, setLike] = useState(false);
  const [following, setFollowing] = useState(false);

  // get post data and user data nested
  useEffect(() => {
    
    const doIFollowAndLikeThisUser = async () => {
      // const answer = await checkFollows(id);
      const answer = true;
      console.log('do I flow this user?', answer);
      setFollowing( true );
      
    }
    
    const getUserData = async (id) => {
      const tempData = await getProfile(id);
      setPostUser(tempData);
      
    }
   
    const getPostAndUser = async () => {
      // wait for the post data to arrive
      const tempPost = await post;
      setPostData(tempPost);
      doIFollowAndLikeThisUser(tempPost.author + 1);
      getUserData(tempPost.author + 1);
      

    }

    getPostAndUser();
    
    
  }, [post]);
  // check for follows
  
  // console.log('what is going on with these objects',postData, user);
  // handle the body click
  const handleClick = () => {
    navigate(`thread/${postData.id}`);
  }
  return (
    <div 
      id="background-PostPreview"
      style={{
        'width': width,
        // 'height': height,
        'backgroundImage': `linear-gradient(rgba(45,255,196,0.2), rgba(15, 15, 100, 0.5)), url(${postData.image})`
      }}
    >
      <div
        id="centerClick-PostPreview"
        onClick={handleClick}
      >
        <div id="title-PostPreview">
          {postData.title}
        </div>
      </div>
      <div id="mainContainer-PostPreview">
        
        <div 
          className='sidebarBg-PostPreview'
          style={{
            'height': height
          }}
        >
          <NavLink to={`/profile/${postUser.id}`}>
            <div 
              id="profPic-PostPreview"
              style={{'backgroundImage': `url(${postUser.profilePic})`}}
              alt="your profile pic"
            > 
            </div>
          </NavLink>

          
          <FollowButton 
            userId={postUser.id}
            postId={(postData.id) ? postData.id : null} 
            state={following} 
            width={'5rem'}/>
        </div>
        
        <div 
          className='sidebarBg-PostPreview'
          style={{
            'height': height
          }}
        >
          <LikeButton
            userId={(user?.id) ? user.id : null}
            postId={(postData.id) ? postData.id : null} 
            state={like}
            width={'5rem'} 
          />
        </div>
      </div>
      
    </div>
  )
}

export default PostPreview    