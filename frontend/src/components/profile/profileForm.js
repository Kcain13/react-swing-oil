import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ProfileForm = () => {
    const initialValues = {
        email: '',
        ghinId: '',
        handicap: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        ghinId: Yup.string().optional(),
        handicap: Yup.number().optional()
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('/profile', values);
            console.log(response.data);
            // Handle successful profile update
        } catch (error) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                setErrors({ email: message });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            {/* <h2>Your Profile</h2> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ghinId">GHIN ID</label>
                            <Field name="ghinId" className="form-control" />
                            <ErrorMessage name="ghinId" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="handicap">Handicap</label>
                            <Field name="handicap" type="number" className="form-control" />
                            <ErrorMessage name="handicap" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Update Profile
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileForm;
