const express = require('express');
const router = express.Router();
const auth = require('../middleware/Auth'); // Correct path to auth middleware
const { searchCourses, fetchCourseDetails } = require('../controllers/Courses');

router.get('/search', auth, searchCourses);
router.get('/:id', auth, fetchCourseDetails);

module.exports = router;
