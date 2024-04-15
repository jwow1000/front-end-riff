import { getPostComments } from "../../services/posts.js"
import { getPost } from "../../services/posts.js"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import AddComment from "../../components/AddComment/AddComment.jsx"
import SubComment from "../../components/SubComment/SubComment.jsx"
import './Thread.css';

function Thread() {
  const { id: postId } = useParams()
  // const [toggle, setToggle] = useState(false)
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])

  
// I need to pull the post that was clicked in Feed.
// Then pull the first comment associated to that post

useEffect(() => {
  
  const fetchPost = async () => {
    console.log(postId)

    try {
      const mainPost = await getPost(postId)
      console.log("THIS IS THE MAIN POST", mainPost)
      setPost(mainPost) 
    } catch (error) {
      console.error("Error fetching post details:", error)
    }
  }
  
  fetchPost()
}, [postId])

useEffect(() => {
  const fetchComments = async () => {
    try {
      const fetchedComments = await getPostComments(post?.id)

      console.log("fetching the comment to the post", fetchedComments)
      setComments(fetchedComments.map(comment => ({ ...comment, subComments: []})))
    } catch (error) {
      console.error("Error fetching comment details:", error)
    }
  }
  if(post) {
    
    fetchComments();
    console.log("THIS IS YOUR COMMENT", comments)
  }
}, [post, postId])
  



  if (!post) return <div> Loading... </div>

  return (
    <div className="root-Thread">
      <div className="root-post-Thread">
        <div className="div-post-title-Thread">
          <p className="post-title-Thread">{post.title}</p>
        </div>
        <div className="img-container-Thread">
          <img id="img-Thread"src={post.image} alt="...Loading Post"/>
        </div>
        <div id="scroll-container">
          <h3 id="scroll-text" className="post-description-Thread">{post.text_body}</h3>
        </div>
        <div className="AddComment-Thread">
          <AddComment imgUrl={post.image} parentId={post.id} />
        </div>
      </div>  
      <div className="root-comment-Thread">
        <div id="root-scroll-container">
          {comments?.map((comment) => (
            <SubComment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Thread