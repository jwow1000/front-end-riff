// this will hold the add post module
import React, { useState } from "react";
import "./AddPost.css";

function AddPost({user}) {
  const [modal, setModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
                  <label htmlFor="fileInput">Add Photo</label>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {selectedFile && (
                    <img
                      src={selectedFile}
                      alt="Selected"
                      className="preview"
                    />
                  )}
                </div>
                <div className="add-caption">
                  <label>Add Caption</label>
                  <input type="text" placeholder="Type" />
                  <input type="submit" Value="POST" />
                  <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPost;
