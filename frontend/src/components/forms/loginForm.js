import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = () => {
    const initialValues = {
        username: '',
        password: '',
        rememberMe: false
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('/login', values);
            console.log(response.data);
            // Handle successful login (e.g., redirect to home page)
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                setErrors({ username: message });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <Field name="rememberMe" type="checkbox" />
                            <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
