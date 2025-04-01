import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'; // Importing CSS file

const CreatePost = () => {
    const navigate = useNavigate();

    const initialValues = {
        title: '',
        postText: '',
        username: ''
    };

    const onSubmit = (values) => {
        axios.post("http://localhost:3001/posts/", values,
        {headers:{"accessToken":localStorage.getItem("accessKey")}})
        .then(response => {
                //console.log(response.data);
                navigate('/posts');
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
            <h2 className="form-title">Create a New Post</h2>
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

                    <button type="submit" className="submit-button">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
};

export default CreatePost;
