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
    const courseCode = req.params.courseCode.toUpperCase();
    myCourseAggregate = await Course.aggregate([
        { $match: { courseCode: courseCode} },
        { $lookup: { from: "myCourses", localField: "courseCode", foreignField: "courseCode", as: "myCourses"}},
        { $unwind: '$myCourses' },
        { $set: { grade: '$myCourses.grade' }},
        { $project : {'_id': 0, 'myCourses' : 0}}
    ]);

    // See if courseCode exist in myCourse
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
    const courseCode = req.params.courseCode.toUpperCase();
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


// Add a course to my-courses
routes.post('/api/courses/my', async function (req, res) {
    const courses = await Course.getAllCourses();
    const myCourses = await MyCourse.getAllMyCourses();
    var isMiunCourse = false;
    var isAlreadyMyCourse = false;

    const newCourse = new MyCourse({
        courseCode: req.body.courseCode,
        grade: req.body.grade
    });

    for(let i = 0; i < courses.length; i++){
        if(newCourse.courseCode == courses[i].courseCode){
            isMiunCourse = true;
            for(let i = 0; i < myCourses.length; i++){
                if(newCourse.courseCode == myCourses[i].courseCode){
                    isAlreadyMyCourse = true;
                }
            }
        }
    }

    if (isMiunCourse == true) {
        if (isAlreadyMyCourse != true) {
            await newCourse.save();
            const myCoursesAggregate = await Course.aggregate([
                { $match: { courseCode: newCourse.courseCode} },
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
        }
        else{
            res.status(409).send({"error": "Course already exist in my-courses"});                   
        }
    } 
    else{
        res.status(404).send({"error": "Course does not exist in MIUN-courses"})
    }; 

});

// Update my-course
routes.put('/api/courses/my/:courseCode', async function (req, res) { 
    const courseCode = req.params.courseCode;
    const errorResponse = `Not possible to update courseCode: ${courseCode}`;

    // For easier handling, create an object with user data to be update
    const userDataToUpdate = {
        grade: req.body.grade,
    };

    MyCourse.getMyCourse(courseCode).then(async course => {
        if (course?.courseCode) {
            await MyCourse.updateMyCourse(courseCode, userDataToUpdate)
            const myCoursesAggregate = await Course.aggregate([
                { $match: { courseCode: req.params.courseCode} },
                { $lookup: { from: "myCourses", localField: "courseCode", foreignField: "courseCode", as: "myCourses"}},
                { $unwind: '$myCourses' },
                { $set: { grade: '$myCourses.grade' }},
                { $project : {'_id': 0, 'myCourses' : 0}}
            ]);
            res.status(200).json(myCoursesAggregate);
        }
        else {
            res.status(404).json({ error: errorResponse })
        }
    })
});

// Delete my-course
routes.delete('/api/courses/my/:courseCode', async function (req, res) { 
    const courseCode = req.params.courseCode;
    const errorResponse = `Not possible to delete course: ${courseCode}`;

    MyCourse.getMyCourse(courseCode).then(async course => {
        if (course?.courseCode) {
            
            const myCoursesAggregate = await Course.aggregate([
                { $match: { courseCode: req.params.courseCode} },
                { $lookup: { from: "myCourses", localField: "courseCode", foreignField: "courseCode", as: "myCourses"}},
                { $unwind: '$myCourses' },
                { $set: { grade: '$myCourses.grade' }},
                { $project : {'_id': 0, 'myCourses' : 0}}
            ]);
            await MyCourse.deleteMyCourse(courseCode)
            res.status(200).json(myCoursesAggregate);
        }
        else {
            
            res.status(404).json({ error: errorResponse })
        }
    })
});


module.exports = routes;