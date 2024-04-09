// this will hold the add post module
import React, { useState } from "react";
import "./AddPost.css";

function AddPost() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    console.log("I have been clicked")
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="add-btn-modal">
        Add Post
      </button>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h1>Add Post</h1>
              <form className="add-post-form">
                <div className="add-file">
                  <label>Add Photo</label>
                  <input type="file" placeholder="Add File" />
                </div>
                <div className="add-caption">
                  <label>Add Caption</label>
                  <input type="text" placeholder="Type" />
                  <input type="submit" placeholder="Post"/>
                </div>
              </form>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPost;
