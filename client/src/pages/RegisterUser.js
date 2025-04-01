import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterUser.module.css';

const RegisterUser = () => {
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: ''
    };

    const onSubmit = (values) => {
        axios.post("http://localhost:3001/auth/register", values)
            .then(response => {
                alert(response.data);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const validationSchema = Yup.object({
        username: Yup.string().min(6).max(15).required('Username is Required'),
        password: Yup.string().min(6).max(15).required('Password is Required'),
    });

    return (
        <div className={styles.createPostContainer}>
            <h2 className={styles.formTitle}>Register New User</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className={styles.postForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <Field type="text" name="username" className={styles.inputField} />
                        <ErrorMessage name="username" component="div" className={styles.errorMessage} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" className={styles.inputField} />
                        <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                    </div>

                    <button type="submit" className={styles.registerButton}>Register</button>
                </Form>
            </Formik>
        </div>
    );
};

export default RegisterUser;