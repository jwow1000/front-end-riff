import { useState, useEffect } from "react";
import { getPostComments } from "../../services/posts.js"
import AddComment from "../AddComment/AddComment";
import "./SubComment.css"


function SubComment({comment}) {
   
    async function getChildComments() {
        console.log('FETCHING CHILD COMMEEEEEEEEEENTS')
        let results = await getPostComments(comment.id)
        setChildComments(results)      
     }

     const [childComments, setChildComments] = useState([])
     const [showChildren, setShowChildren] = useState(false)

    useEffect(() => {
       
          getChildComments();       
     } ,[]
    )

  return (
    <div key={comment.id} className="map-comment-Thread">
        <div>
          <img src={comment.image} />
        </div>
          <AddComment imgUrl={comment.image} parentId={comment.id} />
        <div id="scroll-container">
          <h3 id="scroll-text" className="post-description-Thread">{comment.text_body}</h3>
        </div>
        <div>
          {childComments.length > 0? <p>{childComments.length} subcomments</p>: null}
        </div>
        <div className="comments-btn-SubComment">
          <button onClick={() => {setShowChildren(!showChildren)}}></button>
        </div>
      <div className="map-moreComments-Thread">
        {showChildren && childComments.map((comment) => (
          <SubComment comment={comment}/>
        ))}
      </div>
    </div>
  );
}

export default SubComment;
