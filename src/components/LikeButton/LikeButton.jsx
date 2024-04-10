import likeOn from "../../assets/like-on.png";
import likeOff from "../../assets/like-off.png";
import { useEffect, useState } from "react";
import "./LikeButton.css";


function LikeButton({state, width}) {
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
