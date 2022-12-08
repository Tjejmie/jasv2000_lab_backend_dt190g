const mongoose = require('mongoose');

const myCoursesSchema = new mongoose.Schema({

    courseCode : String,
    grade : String,

},
{collection: 'myCourses'});

// Get specific course
myCoursesSchema.statics.getMyCourse = function (courseCode) {
    return this.findOne({courseCode : courseCode});
};

module.exports = mongoose.model('MyCourse', myCoursesSchema);



