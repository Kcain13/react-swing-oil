// src/pages/CourseDetailsPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import CourseDetails from '../components/courses/CourseDetails';

const CourseDetailsPage = () => {
    const { id } = useParams();

    return (
        <div className="course-details-page">
            <CourseDetails courseId={id} />
        </div>
    );
};

export default CourseDetailsPage;
