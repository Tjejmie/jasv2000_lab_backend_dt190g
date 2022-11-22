// Include all needed modules
const express = require('express');
const cors = require('cors');


// Create an Express application
const app = express();
app.use(cors());  // CORS-enabled for all origins!

// Define the port the server will accept connections on
const port = process.env.PORT || 3000;


// Start the server
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});

var jsonfile = require("jsonfile");
var file = "miun-db.json";
var jsonData = [];

jsonfile.readFile(file, function(err, obj){
    if(err){
        console.log(err)
    }
    else{

        jsonData = obj;
    }
});


// Get all my-courses
app.get("/api/courses/my", function(req, res){
    var myCourses = jsonData.myCourses;
    var courses = jsonData.courses;
    var subject = null;
    var arrayWithMyCourses = [];

    for(let i = 0; i < myCourses.length; i++){
        var myCourse = myCourses[i].courseCode;
        for(let i =0; i < courses.length; i++){
            if(myCourse == courses[i].courseCode){
                arrayWithMyCourses.push(courses[i])
            }
        }
    }

    for(let i = 0; i < arrayWithMyCourses.length; i++){
        var subjectCode = arrayWithMyCourses[i].subjectCode;
        var grade = myCourses[i].grade;
   
        for(let i = 0; i < jsonData.subjects.length; i++){
            if(subjectCode == jsonData.subjects[i].subjectCode){
                subject = jsonData.subjects[i].subject;
            }
        }
        arrayWithMyCourses[i].subject = subject;
        arrayWithMyCourses[i].grade = grade;
    }
    res.status(200).json(arrayWithMyCourses);

})

// Get specific my-courses
app.get("/api/courses/my/:courseCode", function(req, res){
    var myCourses = jsonData.myCourses;
    var courses = jsonData.courses;
    var subject = null;
    var arrayWithMyCourses = [];
    var course = {};
    var courseCode = req.params.courseCode.toUpperCase();

    for(let i = 0; i < myCourses.length; i++){
        var myCourse = myCourses[i].courseCode;
        for(let i =0; i < courses.length; i++){
            if(myCourse == courses[i].courseCode){
                arrayWithMyCourses.push(courses[i])
            }
        }
    }

    for(let i = 0; i < arrayWithMyCourses.length; i++){
        if (arrayWithMyCourses[i].courseCode == courseCode){
            var subjectCode = arrayWithMyCourses[i].subjectCode;
            var grade = myCourses[i].grade;
            for(let i = 0; i < jsonData.subjects.length; i++){
                if(subjectCode == jsonData.subjects[i].subjectCode){
                    subject = jsonData.subjects[i].subject;
                }
            }
            arrayWithMyCourses[i].subject = subject;
            arrayWithMyCourses[i].grade = grade;
            course = arrayWithMyCourses[i];
        }
    }
    res.status(200).json(course);
})

// Get specific MIUN-course
app.get("/api/courses/:courseCode", function(req, res){
    var courseCode = req.params.courseCode.toUpperCase();
    var courses = jsonData.courses;
    var course = {};

    for(let i=0; i<courses.length; i++){
        if(courses[i].courseCode == courseCode){
            var subjectCode = courses[i].subjectCode;
            for(let i = 0; i < jsonData.subjects.length; i++){
                if(subjectCode == jsonData.subjects[i].subjectCode){
                    subject = jsonData.subjects[i].subject;
                }
            }
            course = courses[i];
            course.subject = subject;
        }
    }
    res.status(200).json(course);

})


// Get all MIUN-courses
app.get("/api/courses", function(req, res){
    var courses = jsonData.courses;
    var subject = null;

    for(let i = 0; i < courses.length; i++){
        var subjectCode = courses[i].subjectCode;
        for(let i = 0; i < jsonData.subjects.length; i++){
            if(subjectCode == jsonData.subjects[i].subjectCode){
                subject = jsonData.subjects[i].subject;
            }
        }
        courses[i].subject = subject;
    }
    res.status(200).json(courses);
})




