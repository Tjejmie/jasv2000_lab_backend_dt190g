const routes = require('express').Router();
const Courses = require('../models/course');

routes.get('/api/courses', function (req, res) {
    Courses.getAllUsers()
        .then(courses => res.status(200).json(courses)); // 200 OK
});

module.exports = routes;