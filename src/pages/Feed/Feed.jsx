// this is the main feed
import { useEffect, useState } from "react";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import AddPost from "../../components/AddPost/AddPost.jsx";
import { getPosts, getFavPosts } from "../../services/posts.js";
import { getUserPostsById } from "../../services/users.js";
import { followsList } from "../../services/follows.js";
import "./Feed.css";

function Feed({user, follows, feedType}) {
  const [posts, setPosts] = useState([]);
  
  // hook to fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      // // get posts by user ID async function
      // const getPostsId = async (id) => {
      //   const data = await getUserPostsById(id);
      //   console.log('checkout ur user posts', data)
      //   setPosts(data);
      // }

      try {
        if(feedType === 'main') {
          // get all parent posts
          const postsData = await getPosts();
          // console.log("This is the post Data in main: ", postsData)
          const tempArr = postsData.filter((post) => {
            return (!post.parent) ? post : null;
          });
          
          setPosts(tempArr);
        } else if (feedType === 'fav') {
          console.log(user.profile_obj.id)
          const dataTemp = await getFavPosts(user.profile_obj.id);
          const tempArr = dataTemp.filter((post) => {
            return (!post.parent) ? post : null;
          });
          setPosts(tempArr)
        } else {
          // get my likes
        }
        
      } catch {
        console.error('no posts', error);
      }
    }
    fetchPosts()},
   [feedType])
  
  return (
    <div id="mainContainer-Feed">
      <div 
        id="previewContainer-Feed"
        className={(feedType === 'user') ? "containerUSER-Feed" : null}
      >
        <div id="addPost-Feed">
          <AddPost user={user} />
        </div>
        {
          posts && posts.map((post, idx) => (
            <PostPreview  
              post={post} 
              key={idx}
              user={user}
              follows={follows}
              width={`80vw`}
              height={`10rem`}
              // width={`${randomInt(20,70)}vw`}
              // height={`${randomInt(3,10)}rem`}
            />
          
          ))
        }
      </div>
    </div>
  );
}
      



export default Feed;
