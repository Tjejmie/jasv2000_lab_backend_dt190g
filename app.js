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
    res.send(courses);
})
