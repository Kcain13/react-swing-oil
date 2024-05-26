// src/utils/validation.js

import * as Yup from 'yup';

export const registrationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    ghinId: Yup.number().optional(),
    stateCode: Yup.string().required('State code is required')
});

export const loginSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required')
});
