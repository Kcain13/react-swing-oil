import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registrationSchema } from '../../utils/Validation';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            ghinId: '',
            stateCode: ''
        },
        validationSchema: registrationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await axios.post('/api/auth/register', values);
                navigate('/login'); // Redirect to login page after successful registration
            } catch (error) {
                setError(error.response ? error.response.data.error : 'Registration failed');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName || ''}
                    autoComplete="given-name"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName || ''}
                    autoComplete="family-name"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username || ''}
                    autoComplete="username"
                />
                {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email || ''}
                    autoComplete="email"
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password || ''}
                    autoComplete="new-password"
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="ghinId">GHIN ID</label>
                <input
                    id="ghinId"
                    name="ghinId"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ghinId || ''}
                    autoComplete="off"
                />
                {formik.touched.ghinId && formik.errors.ghinId ? (
                    <div>{formik.errors.ghinId}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="stateCode">State</label>
                <input
                    id="stateCode"
                    name="stateCode"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stateCode || ''}
                    autoComplete="address-level1"
                />
                {formik.touched.stateCode && formik.errors.stateCode ? (
                    <div>{formik.errors.stateCode}</div>
                ) : null}
            </div>
            <div>
                <button type="submit" disabled={formik.isSubmitting}>Register</button>
            </div>
        </form>
    );
};

export default RegistrationForm;
