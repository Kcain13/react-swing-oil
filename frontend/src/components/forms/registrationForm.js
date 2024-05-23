import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegistrationForm = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        ghinId: '',
        state: ''
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
        ghinId: Yup.string().required('Required'),
        state: Yup.string().required('Required')
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('/register', values);
            console.log(response.data);
            // Handle successful registration (e.g., redirect to login page)
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
            <h2>Register</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" className="form-control" />
                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" className="form-control" />
                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ghinId">GHIN ID</label>
                            <Field name="ghinId" className="form-control" />
                            <ErrorMessage name="ghinId" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State of Residency</label>
                            <Field name="state" className="form-control" />
                            <ErrorMessage name="state" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;
