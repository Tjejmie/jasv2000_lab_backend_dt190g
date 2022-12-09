const routes = require('express').Router();
const Subject = require('../models/subject');

// Get all subjects
routes.get('/api/subjects', function (req, res) {
    Subject.getAllSubjects()
        .then(subjects => res.status(200).json(subjects));
});


// Get specific subject, return {} if it doesn't exist
routes.get('/api/subjects/:subjectCode', function (req, res) {
    const subjectCode = req.params.subjectCode.toUpperCase();
    Subject.getSubject(subjectCode)
        .then(subject => {
            if (subject?.subjectCode) {
                res.status(200).json(subject);
            }
            else {
                res.status(200).json({});
            }
        })
});

module.exports = routes;