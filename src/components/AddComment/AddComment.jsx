import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import { createPost } from "../../services/posts.js"
import "./AddComment.css"


function AddComment({ parentId, imgUrl }) {

    const [modal, setModal] = useState(false)
    const [comment, setComment] = useState({
        title: "",
        text_body: "",
        image: "",
      });

      useEffect(() => {
        setComment(prev => ({
            ...prev,
            "parent": parentId
      }))
      }, [parentId]) 

    const toggleModal = () =>{
        setModal(!modal)
    }

    const handleDownloadImage = () => {
        const link = document.createElement('a');
        link.href = imgUrl;
        const filename = imgUrl.split('/').pop();
        link.download = ('download', filename || 'DownloadedImage');
        link.setAttribute('target', '_blank');
        link.style.display = 'none'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
          setComment((prev) => ({
            ...prev,
            [name]: files[0]
          }));
        } else {
          setComment((prev) => ({
            ...prev,
            [name]: value
          }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData()
        // console.log(formData)
        // console.log(comment)
        // Object.keys(comment).forEach(key => {
        //     console.log(key, comment[key])
        //     formData.append(key, comment[key])
        // })
        // formData.append('parent', parentId)
        // console.log(formData)
        
        

      console.log(comment)

        try {

            const response = await createPost(comment);
            if (response.status === 201) {
                console.log("Comment added successfully")
                toggleModal();
                location.reload();
            } else {
                console.log("Comment FAILED successfully")
                location.reload();

            }
            
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
      };


  return (
    <div>
        <button onClick={toggleModal} className="btn-modal-AddComment"> Add Comment</button>
        {modal && (
          <div className="root-modal-AddComment">
            <div className="form-modal-AddComment">
                <h1>Add Comment</h1>
                <Form onSubmit={handleSubmit}>
                    <Button variant="info" onClick={handleDownloadImage}>
                        Download Img
                    </Button>
                    <Row>
                        <Form.Group className="title-add-AddComment">
                        <Form.Label> Title </Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={comment.title}
                            onChange={handleChange}
                        />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="text-add-AddComment">
                        <Form.Label> Description </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="text_body"
                            value={comment.text_body}
                            onChange={handleChange}
                        />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="img-upload-AddComment" controlId="formFile">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png"
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    <Button variant="secondary" onClick={toggleModal} style={{ marginLeft: '10px' }}>
                        Close
                    </Button>
                </Form>
            </div>
          </div>  
        )}
    </div>
  )
}

export default AddComment