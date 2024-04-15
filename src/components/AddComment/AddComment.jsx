import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createPost } from "../../services/posts.js";
import "./AddComment.css";

function AddComment({ parentId, imgUrl }) {
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState({
    title: "",
    text_body: "",
    image: "",
  });

  useEffect(() => {
    setComment((prev) => ({
      ...prev,
      parent: parentId,
    }));
  }, [parentId]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = imgUrl;
    const filename = imgUrl.split("/").pop();
    link.download = ("download", filename || "DownloadedImage");
    link.setAttribute("target", "_blank");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setComment((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setComment((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('what s this',  comment);

    try {
      const response = await createPost(comment);
      if (response.status === 201) {
        console.log("Comment added successfully");
        toggleModal();
        location.reload();
      } else {
        console.log("Comment FAILED successfully");
        location.reload();
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  //   return (
  //     <div>
  //         <button onClick={toggleModal} className="btn-modal-AddComment"> Draw me Leo!</button>
  //         {modal && (
  //           <div className="root-modal-AddComment">
  //             <div className="form-AddComment">
  //               <div className="form-title-AddComent">
  //                 <h1>Like one of your french girls!</h1>
  //               </div>
  //                 <Form onSubmit={handleSubmit}>
  //                     <Button variant="info" onClick={handleDownloadImage}>
  //                         Download Img
  //                     </Button>
  //                     <Row>
  //                         <Form.Group className="title-add-AddComment">
  //                         <Form.Label> Title </Form.Label>
  //                         <Form.Control
  //                             type="text"
  //                             name="title"
  //                             value={comment.title}
  //                             onChange={handleChange}
  //                         />
  //                         </Form.Group>
  //                     </Row>
  //                     <Row>
  //                         <Form.Group className="text-add-AddComment">
  //                         <Form.Label> Description </Form.Label>
  //                         <Form.Control
  //                             as="textarea"
  //                             rows={3}
  //                             name="text_body"
  //                             value={comment.text_body}
  //                             onChange={handleChange}
  //                         />
  //                         </Form.Group>
  //                     </Row>
  //                     <Row>
  //                         <Form.Group className="img-upload-AddComment" controlId="formFile">
  //                         <Form.Label></Form.Label>
  //                         <Form.Control
  //                             type="file"
  //                             name="image"
  //                             accept="image/jpeg,image/png"
  //                             onChange={(e) => {
  //                                 handleChange(e);
  //                             }}
  //                             />
  //                         </Form.Group>
  //                     </Row>
  //                     <Button variant="primary" type="submit">
  //                         Submit
  //                     </Button>
  //                     <Button variant="secondary" onClick={toggleModal} style={{ marginLeft: '10px' }}>
  //                         Close
  //                     </Button>
  //                 </Form>
  //             </div>
  //           </div>
  //         )}
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className="btn-AddComment">
        <button onClick={toggleModal} className="btn-modal-AddComment">
          Draw me Leo!
        </button>
      </div>
      <Modal
        isOpen={modal}
        onRequestClose={toggleModal}
        contentLabel="Add Comment"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="btn-close-modal">
          <button onClick={toggleModal} className="close-modal-button">
            X
          </button>
        </div>
        <div className="modal-header">
          <h2>Like one of your French girls</h2>
        </div>

        <form 
          className="modal-form" 
          onSubmit={handleSubmit}
          method="POST" 
          encType="multipart/form-data"
        >
          {/* <form className="modal-form" onSubmit={(e) => e.preventDefault()}> */}
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={comment.title}
              onChange={handleChange}
              className="text-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="text_body">Description:</label>
            <textarea
              id="text_body"
              name="text_body"
              rows="3"
              value={comment.text_body}
              onChange={handleChange}
              className="textarea-input"
            />
          </div>
          <div className="form-group">
            <button variant="info" onClick={handleDownloadImage}>
              Download IMG
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg,image/png"
              onChange={handleChange}
              className="file-input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddComment;
