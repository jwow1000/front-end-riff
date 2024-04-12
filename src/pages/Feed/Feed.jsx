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
        console.log('checkout ur user posts', data)
        setPosts(data);
      }

      try {
        if(feedType === 'main') {
          // get all parent posts
          const postsData = await getPosts();
          const tempArr = postsData.filter((post) => {
            return (!post.parent) ? post : null;
          });
          
          setPosts(tempArr);
        } else if (feedType === 'user') {
          console.log('try to get user posts')
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
      <div 
        id="previewContainer-Feed"
        className={(feedType === 'user') ? "containerUSER-Feed" : null}
      >
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
