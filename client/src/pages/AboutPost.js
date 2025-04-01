import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AboutPost.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useNavigate } from "react-router-dom";

const AboutPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [commentsList, setCommentsList] = useState([]);
  const username=localStorage.getItem("username");
  const navigate = useNavigate();

  const initialValues = {
    comment: "",
  };

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:3001/comments", { comment: values.comment, postId: post.id },
      {headers:{accessToken:localStorage.getItem("accessKey")}})
      .then((response) => {
        if(response.data.Error){
          alert(response.data.Error);
          resetForm();

        }
        else{
          console.log(response);
          resetForm();
          setCommentsList([...commentsList, { comment: values.comment, postId: post.id }])

        }

        
        //navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/posts/byId/${id}`)
      .then((response) => {
        //console.log(response.data);
        setPost(response.data);
      })
      .catch((err) => console.log(err));
    
    axios.get(`http://localhost:3001/comments/post/${id}`)
      .then(response => {
        //console.log(response.data);
        setCommentsList(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleDelete=(postId)=>{
    axios.delete(`http://localhost:3001/posts/deletepost/${postId}`,
    {headers:{"accessToken":localStorage.getItem("accessKey")}}
    )
    .then(response=>{
      alert(response.data);
      navigate('/posts');

    })


  }
  const handleEdit=(postId)=>{
    //console.log('editfunction',postId);
    navigate(`/editpost/${postId}`);
  }

  return (
    <div className={styles.container}>
      {/* Left Section: Post */}
      <div className={styles.postSection}>
        <div className={styles.post} key={post.id}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postText}>{post.postText}</p>
          <p className={styles.username}>Posted by: {post.username}</p>
          {post.username===username?(<><button onClick={()=>handleDelete(post.id)} style={{ marginRight: '10px' }}>Delete</button><button onClick={()=>handleEdit(post.id)}>Edit</button></>):null}
        </div>
      </div>

      {/* Right Section: Comment Form */}
      <div className={styles.commentSection}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className={styles.commentForm}>
              <ErrorMessage name="comment" component="div" className={styles.errorMessage} />
              <Field type="text" name="comment" placeholder="Add Comment..." className={styles.commentInput} />
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Comment"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Comments List */}
        <div className={styles.commentsList}>
          {commentsList.map((comment, index) => (
            <div className={styles.commentItem} key={index}>
              <p className={styles.commentText}>{comment.comment}</p>
              <p className={styles.commentFooter}>Posted on: {new Date().toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPost;
