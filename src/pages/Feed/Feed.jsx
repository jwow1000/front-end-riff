// this is the main feed
import { useEffect, useState } from "react";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import AddPost from "../../components/AddPost/AddPost.jsx";
import { getPosts } from "../../services/posts.js";
import "./Feed.css";

function Feed({user, feedType}) {
  const [posts, setPosts] = useState([]);
  
  // hook to fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      let postsData = false;
      try {
        if(feedType === 'main') {
          postsData = await getPosts();
        } else {
          //const postsData = await getPosts
        }

        console.log('we got the posts my dude', postsData);
        setPosts(postsData);
        
      } catch {
        console.error('no posts', error);
        
      }
    
    }
    fetchPosts();
    console.log('amount of objects in posts array: ', posts);
  }, []);

  return (
    <div>
      <div id="previewContainer-Feed">
        <AddPost />
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
