// this is the main feed
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import AddPost from "../../components/AddPost/AddPost.jsx";
import { getPosts } from "../../services/posts.js";
import { getUserPostsById } from "../../services/users.js";
import "./Feed.css";

function Feed({user, feedType}) {
  const [posts, setPosts] = useState([]);
  
  // hook to fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      // get posts by user ID async function
      const getPostsId = async (id) => {
        const data = await getUserPostsById(id);
        setPosts(data);
      }

      try {
        if(feedType === 'main') {
          // just get all posts
          const postsData = await getPosts();
          setPosts(postsData);
        } else if (feedType === 'user') {
          // wait for user
          const userData = await user;
          const dataTemp = await getPostsId(userData);
          setPosts(dataTemp);
          // console.log('this is the user feed print',user.id, postsData)
        } else {
          // get my likes
        }

        console.log('we got the posts my dude', postsData);
        setPosts(postsData);
        
      } catch {
        console.error('no posts', error);
      }
    }
    fetchPosts();
    console.log('amount of objects in posts array: ', posts);
  }, [feedType]);
  
  return (
    <div>
      <div id="previewContainer-Feed">
        <AddPost user={user} />
        {
          posts && posts.map((post, idx) => (
            <PostPreview 
              post={post} 
              key={idx}
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
