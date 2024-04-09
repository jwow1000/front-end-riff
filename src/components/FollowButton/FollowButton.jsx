import likeOn from "../../assets/follow-on.png";
import likeOff from "../../assets/follow-off.png";
import { useEffect, useState } from "react";
import "./FollowButton.css";


function LikeButton({state}) {
  // define state for like status
  const [like, setLike] = useState(false);
  
  // load like from props
  useEffect( () => {
    setLike(state);
  }, []);
  
  // toggle like on click
  const handleClick = () => {
    setLike(!like);
  };

  return (
    <div onClick={handleClick}>
      <img 
        src={(like) ? likeOn : likeOff} 
        alt={(like) ? 'the like button is on' : 'the like button is off' } />
    </div>
  );
}

export default LikeButton;
