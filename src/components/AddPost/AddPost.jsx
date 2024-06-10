// this will hold the add post module
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createPost } from "../../services/posts.js";
import "./AddPost.css";

function AddPost({ user, setReload }) {

  //modal

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const reloadFeed = () => {
    setReload(prevReload => !prevReload);
  }

  const [post, setPost] = useState({
    title: "",
    text_body: "",
    parent: null,
    image: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    text_body: "",
    parent: null,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPost((prevPost) => ({
        ...prevPost,
        [name]: files[0]
      }));
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createPost(post);
    if (response.status === 400) {
      setErrors(response.data);
    }
    toggleModal();
    reloadFeed();
    // location.reload();
  };

  return (
    <>
      <button onClick={toggleModal} className="add-btn-modal">
        Add Your Own Post!
      </button>

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h1>Add Your Post</h1>
              <Form className="add-post-form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <Row>
                  <Form.Group className="mb-3" controlId="titleInput">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={post.title}
                      isInvalid={errors.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <Form.Text className="alert-danger" tooltip>
                        {errors.title}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group className="mb-3" controlId="formFile">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      accept="image/jpeg,image/png"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    {errors.image && (
                      <Form.Text className="alert-danger" tooltip>
                        {errors.image}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="textBodyInput">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="text_body"
                    value={post.text_body}
                    isInvalid={errors.text_body}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {errors.text_body && (
                    <Form.Text className="alert-danger" tooltip>
                      {errors.text_body}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPost;

