const axios = require('axios');
const { getAdminToken } = require('../utils/tokenManager');
// const { Course } = require('./models')

const searchCourses = async (query) => {
    try {
        const token = await getAdminToken();
        if (!token) {
            throw new Error('Authentication token is missing or invalid');
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
        };
        const params = { name: query };
        const apiUrl = 'https://api2.ghin.com/api/v1/courses/search.json';

        const response = await axios.get(apiUrl, { headers, params });
        return response.data.courses || [];
    } catch (error) {
        console.error('Failed to search courses:', error.response ? error.response.statusText : error.message);
        return [];
    }
};

const fetchCourseDetails = async (courseId) => {
    try {
        const token = await getAdminToken();
        if (!token) {
            throw new Error('Authentication token is missing or invalid');
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
        };
        const apiUrl = `https://api2.ghin.com/api/v1/courses/${courseId}.json`;

        const response = await axios.get(apiUrl, { headers });
        const data = response.data;

        return {
            Facility: data.Facility || {},
            Season: data.Season || {},
            TeeSets: data.TeeSets || [],
            CourseStatus: data.CourseStatus || 'Status Unknown',
            CourseCity: data.CourseCity || 'City not available',
            CourseState: data.CourseState || 'State not available',
            CourseId: data.CourseId || 'Courseid not available'
        };
    } catch (error) {
        console.error('Failed to fetch course details:', error.response ? error.response.statusText : error.message);
        return null;
    }
};

const createRound = async (golferId, courseId, teeId, gameTypeId, useHandicap) => {
    // Your logic to create a new round in the database
};

module.exports = {
    searchCourses,
    fetchCourseDetails,
    createRound
};
