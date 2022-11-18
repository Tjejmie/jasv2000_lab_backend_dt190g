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
var courses = [];

jsonfile.readFile(file, function(err, obj){
    if(err){
        console.log(err)
    }
    else{

        courses = obj;
    }
});

// Define a route handler for GET requests to the web root
// Get all MIUN-courses
app.get("/api/courses", function(req, res){

    res.send(JSON.stringify(courses.courses, null, 2));
})


