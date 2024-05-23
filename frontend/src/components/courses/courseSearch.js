import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CourseSearch = () => {
    const [courses, setCourses] = useState([]);

    const initialValues = {
        courseName: ''
    };

    const validationSchema = Yup.object({
        courseName: Yup.string().required('Required')
    });

    const handleSearch = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('/api/courses/search', values);
            setCourses(response.data.courses);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setErrors({ courseName: 'Error fetching courses' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h2>Search Courses</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSearch}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="courseName">Course Name</label>
                            <Field name="courseName" className="form-control" placeholder="Search for a course" />
                            <ErrorMessage name="courseName" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Search</button>
                    </Form>
                )}
            </Formik>
            <ul className="mt-3">
                {courses.map(course => (
                    <li key={course.CourseID}>
                        {course.CourseName} - {course.City}, {course.State}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseSearch;
