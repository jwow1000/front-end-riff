// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';

import './PostPreview.css';

function PostPreview( {post} ) {
  const [profLink, setProfLink] = useState("");
  
  useEffect( () => {
    setProfLink("https://i.ytimg.com/vi/PuTBDeatxSM/maxresdefault.jpg")
  }, [])
  
  
  return (
    
    
    <div 
      id="mainContainer-PostPreview"
      style={{
       
        'backgroundImage': `linear-gradient(rgba(45,255,196,0.2), rgba(15, 15, 100, 0.5)), url(${profLink})`
      }}
    >
      

    </div>
  )
}

export default PostPreview  