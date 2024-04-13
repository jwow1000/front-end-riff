import { getPostComments } from "../../services/posts.js"
import { getPost } from "../../services/posts.js"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import './Thread.css';
import AddComment from "../../components/AddComment/AddComment.jsx"
import SubComment from "../../components/SubComment/SubComment.jsx"

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
  
// const fetchMoreComments = async (commentId) => {
//   try {
//     const fetchedMoreComments = await getPostComments(commentId)
//     setComments(comments.map((comment) => commentId ? {...comment, subComments: fetchedMoreComments } : comment))
//   } catch (error) {
//     console.error("Error fetching MORE comments:", error)
//   }
// }


  if (!post) return <div> Loading... </div>

  return (
    <div>
      <h1 className="post-title-Thread">{post.title}</h1>
      <div className="img-container-Thread"><img src={post.image} alt="...Loading Post"/></div>
      <AddComment imgUrl={post.image} parentId={post.id} />
      <h3 className="post-description-Thread">{post.text_body}</h3>
        <div className="root-comment-Thread">
          {comments?.map((comment) => (
            <SubComment comment={comment} />
          ))}
        </div>
      </div>
  )
}

export default Thread