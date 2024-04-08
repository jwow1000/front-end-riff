// this is the post preview module for the feed page 

import './PostPreview.css';

function PostPreview( {post} ) {
  const imgStyle = {
    'background-img': `url(${post.image})`
  }
  
  return (
    <div 
      id="mainContainer-PostPreview"
      style={imgStyle}
    >
      <div id="profilePicContainer-PostPreview">
        <img src={post.user.profile_pic} alt="profile pic of you, the user" />  
      </div>

    </div>
  )
}

export default PostPreview  