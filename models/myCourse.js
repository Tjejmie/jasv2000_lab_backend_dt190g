const mongoose = require('mongoose');

const myCoursesSchema = new mongoose.Schema({

    courseCode : { type: String, required: true},
    grade : { type: String, required: true}

},
{collection: 'myCourses'});

// Get specific course
myCoursesSchema.statics.getMyCourse = function (courseCode) {
    return this.findOne({courseCode : courseCode});
};


// Get all courses
myCoursesSchema.statics.getAllMyCourses = function () {
    return this.find({});
};

myCoursesSchema.statics.updateMyCourse = function (courseCode, grade) {
    return this
        .findOneAndUpdate({courseCode : courseCode}, grade); // finds a matching document and updates it
};

myCoursesSchema.statics.deleteMyCourse = function (courseCode) {
    return this
        .findOneAndRemove({courseCode : courseCode}); // finds a matching document and updates it
};

module.exports = mongoose.model('MyCourse', myCoursesSchema);



