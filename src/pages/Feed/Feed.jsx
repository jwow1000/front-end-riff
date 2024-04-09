// this is the main feed
import Layout from "../../components/Layout/Layout.jsx";
import PostPreview from "../../components/PostPreview/PostPreview.jsx";
import "./Feed.css";
import AddPost from "../../components/AddPost/AddPost.jsx";
import LikeButton from "../../components/LikeButton/LikeButton.jsx";

function Feed() {
  return (
    <div>
       <Layout>
        <div id="previewContainer-Feed">

          <AddPost />
          <LikeButton />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
        </div>
    </Layout>
    </div>
  );
}

export default Feed;
