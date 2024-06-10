// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getProfile } from '../../services/users.js';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import { parseMongoDate } from '../../services/conversions.js';
import './PostPreview.css';

function PostPreview( {post, width, height, user, follows, setTrigUser} ) {
  const navigate = useNavigate();

  const [postUser, setPostUser] = useState({});
  const [like, setLike] = useState(false);
  const [following, setFollowing] = useState(false);
  
  // get post data and user data nested
  useEffect(() => {
    
    
    const getPostAndUser = async () => {
      
      const tempData = await getProfile(post.author);
      setPostUser(tempData);
      console.log (follows)
      const checkFollow = follows?.some(follow => {
        return follow?.isFollowing === tempData?.id
      })
      
      setFollowing(checkFollow);     
      
    }
    
    getPostAndUser();
    
    
  }, [post, follows]);
  // check for follows
  console.log('what does user look like', postUser);
  
  const handleClick = () => {
    navigate(`/thread/${post.id}`);
  }
  return (
    <div 
      id="background-PostPreview"
      style={{
        'width': width,
        'height': height,
        'backgroundImage': `url(${post.image})`
      }}
    >
      <div
        id="centerClick-PostPreview"
        onClick={handleClick}
      >
        <div id="title-PostPreview">
          {post.title}
        </div>
        <div id="date-PostPreview">
          {parseMongoDate( post.added )}
        </div>
        <div id="date-PostPreview">
          {parseMongoDate( post.added )}
        </div>
      </div>
      <div id="mainContainer-PostPreview">
        
        <div 
          className='sidebarBg-PostPreview'
          style={{
            'height': height
          }}
        >
          <NavLink to={`/profile`}>
            <div 
              id="profPic-PostPreview"
              style={{'backgroundImage': `url(${postUser?.profilePic})`}}
              alt="your profile pic"
            > 
            </div>
          </NavLink>

          {

            (user.user_obj?.id !== postUser.user) ?
              <FollowButton 
                userId={postUser?.user}
                postId={(post.id) ? post.id : null} 
                state={following} 
                setTrigUser={setTrigUser}
                width={'5rem'}
              />
            :
              null
          }
        </div>
        
        <div 
          className='sidebarBg-PostPreview'
          style={{
            'height': height
          }}
        >
          <LikeButton
            userId={(user?.id) ? user.id : null}
            postId={(post.id) ? post.id : null} 
            state={like}
            width={'5rem'} 
          />
        </div>
      </div>
      
    </div>
  )
}

export default PostPreview    