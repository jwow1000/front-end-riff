import followOn from "../../assets/follow-on.png";
import followOff from "../../assets/follow-off.png";
import {addFollower, removeFollower} from "../../services/follows.js";
import { useEffect, useState } from "react";
import "./FollowButton.css";


function FollowButton({state, width, userId, postId, setTrigUser}) {
  // define state for follow status
  const [follow, setFollow] = useState(state);
  
  // load follow from props
  useEffect( () => {
    setFollow(state);
  }, [state]);

  // toggle follow on click
  const handleClick = () => {
    if(follow) {
      removeFollower(userId);
      setFollow(false);
      setTrigUser(prev => !prev)
    } else {
      addFollower(userId);
      setFollow(true);
      setTrigUser(prev => !prev)
    }
  };
  
  return (
    <div 
      onClick={handleClick}
    >
      <img 
        src={(follow) ? followOn : followOff} 
        alt={(follow) ? 'the follow button is on' : 'the follow button is off' } 
        style={{'width': width}} 
      /> 
    </div>
  );
}

export default FollowButton;
