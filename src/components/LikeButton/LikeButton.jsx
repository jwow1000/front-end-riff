import likeOn from "../../assets/like-on.png";
import likeOff from "../../assets/like-off.png";
import { removeLike, addLike } from "../../services/users";
import { useEffect, useState } from "react";
import "./LikeButton.css";


function LikeButton({state, width, postId, userId}) {
  // define state for like status
  const [like, setLike] = useState(false);
  
  // load like from props
  useEffect( () => {
    setLike(state);
  }, []);
  // async axios add like
  
  // toggle like on click
  const handleClick = () => {
    if(like) {
      removeLike(postId, userId);
      setLike(false);
    } else {
      addLike(postId, userId);
      setLike(true);
    }
  };

  return (
    <div 
      id='container-LikeButton'
      onClick={handleClick}
      >
      <img 
        src={(like) ? likeOn : likeOff} 
        alt={(like) ? 'the like button is on' : 'the like button is off' } 
        style={{'width': width}}
     />
    </div>
  );
}

export default LikeButton;
