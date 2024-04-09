// this is the main feed
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import { getPosts } from "../../services/posts.js";
import "./Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  
  // hook to fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await getPosts();
      setPosts(postData);
    };

    fetchPosts();
  }, []);

  return (
    <div>
       <Layout>
        <div id="previewContainer-Feed">
          {
            posts && posts.map((post) => {
            
              <PostPreview post={post}/>

            }
            )
            
          }
        
        </div>
    </Layout>
    </div>
  );
}



export default Feed;
