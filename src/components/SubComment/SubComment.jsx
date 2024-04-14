import { useState, useEffect } from "react";
import { getPostComments } from "../../services/posts.js"
import AddComment from "../AddComment/AddComment";

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
    <div
      key={comment.id}
      className="map-comment-Thread"
      >
      <button onClick={() => {setShowChildren(!showChildren)}}>RENDER MORE COMMENTS</button>
      <div className="test">{comment.id}</div>
      <div>
        <img src={comment.image} />
        {childComments.length > 0? <p>{childComments.length} subcomments</p>: null}
        <AddComment imgUrl={comment.image} parentId={comment.id} />
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
