const routes = require('express').Router();
const Course = require('../models/course');
const MyCourse = require('../models/myCourse');

// Get all my-courses
routes.get("/api/courses/my", async (req, res) => {
    
    const myCoursesAggregate = await Course.aggregate([
        // Stage 2: Lookup (performs a left outer join on) the referenced country documen
        { $lookup: { from: "myCourses", localField: "courseCode", foreignField: "courseCode", as: "myCourses"}},
        // Stage 3: Unwind (deconstruct) the output array field (as) from stage 2
        { $unwind: '$myCourses' },
        // Stage 4: Add (set) a new field named country with the name of the country
        { $set: { grade: '$myCourses.grade' }},
        // Stage 5: Select (project) which fields to include/exclude
        { $project : {'_id': 0, 'myCourses' : 0}}
    ]);
      
    res.status(200).json(myCoursesAggregate);
})

routes.get("/api/courses/my/:courseCode", async (req, res) => {

    myCourseAggregate = await Course.aggregate([
        { $match: { courseCode: req.params.courseCode} },
        { $lookup: { from: "myCourses", localField: "courseCode", foreignField: "courseCode", as: "myCourses"}},
        { $unwind: '$myCourses' },
        { $set: { grade: '$myCourses.grade' }},
        { $project : {'_id': 0, 'myCourses' : 0}}
    ]);

    // See if courseCode exist in myCourse
    const courseCode = req.params.courseCode;
    MyCourse.getMyCourse(courseCode).then(course => {
        if (course?.courseCode) {
            res.status(200).json(myCourseAggregate[0]);
        }
        else {
            res.status(200).json({});
        }
    })
})


// Get all courses
routes.get('/api/courses', function (req, res) {
    Course.getAllCourses()
        .then(courses => res.status(200).json(courses));
});



// Get specific course, return {} if it doesn't exist
routes.get('/api/courses/:courseCode', function (req, res) {
    const courseCode = req.params.courseCode;
    Course.getCourse(courseCode)
        .then(course => {
            if (course?.courseCode) {
                res.status(200).json(course);
            }
            else {
                res.status(200).json({});
            }
        })
});

module.exports = routes;