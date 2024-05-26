import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../../utils/Validation'; // Import validation schema
import { useAuth } from '../../hooks/UseAuth';

const LoginForm = () => {
    const { login } = useAuth();

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await login(values.username, values.password);
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
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="username">Username</label>
                        <Field name="username" id="username" type="text" autoComplete="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" id="password" type="password" autoComplete="current-password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>Login</button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;