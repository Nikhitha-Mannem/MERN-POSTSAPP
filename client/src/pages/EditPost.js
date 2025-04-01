import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const EditPost=()=>{
    const {id}=useParams();
    const [post,setPost]=useState(null);
    const navigate=useNavigate();

    useEffect(()=>{
        
        axios.get(`http://localhost:3001/posts/byId/${id}`)
        .then(response=>{
            console.log("posts info from useEffect",response.data);
            setPost(response.data);

        })


    },[])

    if(post){
        const initialValues = {
            title: post.title,
            postText: post.postText,
            username: post.username
        };
    
        const onSubmit = (values) => {
            console.log("from On submit in editPost");
            axios.put(`http://localhost:3001/posts/${id}`, values,
            {headers:{"accessToken":localStorage.getItem("accessKey")}})
            .then(response => {
                if(response.data.Error){
                    console.log(response.data.Error);
                }
                else{
                    navigate('/posts');
                }
                })
            .catch(err => console.log(err));
        };
    
        const validationSchema = Yup.object({
            title: Yup.string().required('Title is Required'),
            postText: Yup.string().required('Description is Required'),
            username: Yup.string().required('Username is Required')
        });
    
        return (
            <div className="create-post-container">
                <h2 className="form-title">Edit Post</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className="post-form">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" className="input-field" />
                            <ErrorMessage name="title" component="div" className="error-message" />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="postText">Description</label>
                            <Field as="textarea" name="postText" className="input-field textarea-field" />
                            <ErrorMessage name="postText" component="div" className="error-message" />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field type="text" name="username" className="input-field" />
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>
    
                        <button type="submit" className="submit-button">Edit Post</button>
                    </Form>
                </Formik>
            </div>
        );
    
    

    }

    
}
export default EditPost;