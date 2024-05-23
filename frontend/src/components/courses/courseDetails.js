// src/components/CourseDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`/api/courses/${courseId}`);
                setCourseDetails(response.data);
            } catch (err) {
                console.error('Error fetching course details:', err);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (!courseDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{courseDetails.Facility?.FacilityName || 'Course Details Not Available'}</h1>
            <p><strong>Address:</strong> {courseDetails.Facility?.GeoLocationFormattedAddress || `${courseDetails.CourseCity}, ${courseDetails.CourseState}`}</p>
            <p><strong>Status:</strong> {courseDetails.Facility?.FacilityStatus || 'Status Not Available'}</p>
            <p><strong>Season Start:</strong> {courseDetails.Season?.SeasonStartDate || 'Season Start Not Available'}</p>
            <p><strong>Season End:</strong> {courseDetails.Season?.SeasonEndDate || 'Season End Not Available'}</p>
        </div>
    );
};

export default CourseDetails;
