// this is the main feed
import { useEffect, useState } from "react";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import AddPost from "../../components/AddPost/AddPost.jsx";
import { getPosts } from "../../services/posts.js";
import {randomInt} from "../../services/helpers.js";
import { getUserPostsById } from "../../services/users.js";
import "./Feed.css";

function Feed({user, feedType}) {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);

  // hook to fetch all posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      // get posts by user ID async function
      const getPostsId = async (id) => {
        const data = await getUserPostsById(id);
        // console.log('checkout ur user posts', data)
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
          // console.log('try to get user posts')
          // wait for user
          const userData = await user;
          const dataTemp = await getPostsId(userData);
          setPosts(dataTemp);
          // console.log('this is the user feed print',user.id, postsData)
        } else {
          // get my likes
        }

        console.log('posts succesfully retrieved!', postsData);
        setPosts(postsData);
        
      } catch {
        console.log("can't get the posts");
      }
    }
    fetchPosts();
  }, [feedType, reload]);
  
  return (
    <div id="mainContainer-Feed">
      <div 
        id="previewContainer-Feed"
        className={(feedType === 'user') ? "containerUSER-Feed" : null}
      >
        <div id="addPost-Feed">
          <AddPost user={user} setReload={setReload} />
        </div>
        <div id="header-Feed">
          {
            (feedType === 'main') ?
              <h1> Latest Riff Posts</h1>
            :
              <h1> ˚˚ Ur Fav Riff Posters ˚˚</h1>

          }
        </div>
        {
          posts && posts.map((post, idx) => (
            <PostPreview  
              post={post} 
              key={idx}
              user={user}
              // width={`80vw`}
              // height={`10rem`}
              width={`${randomInt(10,60)}vw`}
              height={`${randomInt(8,20)}rem`}
            />
          
          ))
        }
      </div>
    </div>
  );
}
      



export default Feed;
