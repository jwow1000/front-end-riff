// this is the main feed
import Layout from '../../components/Layout/Layout.jsx';
import PostPreview from '../../components/PostPreview/PostPreview.jsx';
import './Feed.css'; 

function Feed() {
  return (
    <div>
      <Layout>
        <div id='previewContainer-Feed'>
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
           
        </div>
      </Layout>
    </div>
  )
}

export default Feed