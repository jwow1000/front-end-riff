// this is the main feed
import { useEffect, useState } from "react";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import { getPosts } from "../../services/posts.js";
import {randomInt} from "../../services/helpers.js";
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
      <div id="previewContainer-Feed">
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
