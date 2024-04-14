// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getProfile } from '../../services/users.js';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import { parseMongoDate } from '../../services/conversions.js';
import { followsList } from '../../services/follows.js';
import './PostPreview.css';

function PostPreview( {post, width, height, user, follows} ) {
  const navigate = useNavigate();

  // const [postData, setPostData] = useState({});
  const [postUser, setPostUser] = useState({});
  const [like, setLike] = useState(false);
  const [following, setFollowing] = useState(false);

  // get post data and user data nested
  useEffect(() => {
    
    // const doIFollowAndLikeThisUser = async (id) => {
    //   // const answer = await checkFollows(id);
    //   // const answer = true;
    //   // console.log('do I flow this user?', answer);
    //   // [TBU] check if id is in array of follows
    //   setFollowing( true );
      
    // }
    
    // const getUserData = async (id) => {
    //   const tempData = await getProfile(post.author);
    //   setPostUser(tempData);
      
    // }
   
    const getPostAndUser = async () => {
      // wait for the post data to arrive
      // const tempPost = await post;
      // setPostData(tempPost);
      // doIFollowAndLikeThisUser(tempPost.author);
      // map through follows and check if isFollowing matches post.author
      const tempData = await getProfile(post.author);
      setPostUser(tempData);

      const checkFollow = follows?.some(follow => {
        return follow?.isFollowing === tempData?.id
      })
      setFollowing(checkFollow);
      // getUserData(tempPost.author);
      // setPostUser(user.profile_obj);
      

    }

    getPostAndUser();
    
    
  }, [post]);
  // check for follows
  
  // console.log('what is going on with these objects',postData, user);
  // handle the body click
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
          {parseMongoDate( postData.added )}
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

          
          <FollowButton 
            userId={postUser?.user}
            postId={(post.id) ? post.id : null} 
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