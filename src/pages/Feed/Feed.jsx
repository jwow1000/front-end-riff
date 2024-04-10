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
      console.log('try the fetch')
      try {
        const postData = await getPosts();
        setPosts(postData);
        console.log('we got the posts my dude');
      } catch {
        console.error('nah dude');
        setPosts([
          {'profile_pic': 'https://www.pngall.com/wp-content/uploads/9/SpongeBob-SquarePants-PNG-HD-Image.png'},
          {'profile_pic': 'https://www.pngall.com/wp-content/uploads/9/SpongeBob-SquarePants-PNG-HD-Image.png'},
          {'profile_pic': 'https://www.pngall.com/wp-content/uploads/9/SpongeBob-SquarePants-PNG-HD-Image.png'}

        ])
      }
    
    }
    fetchPosts();
    console.log('amount of objects in posts array: ', posts.length);
  }, []);

  return (
    <div>
      <Layout>
        <div id="previewContainer-Feed">
          {
            posts && posts.map((post, idx) => (
              <PostPreview post={post} key={idx} />
            
            ))
            
            
          }
        
        </div>
      </Layout>
    </div>
  );
}



export default Feed;
