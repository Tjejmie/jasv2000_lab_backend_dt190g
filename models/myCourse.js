const mongoose = require('mongoose');

const myCoursesSchema = new mongoose.Schema({

    courseCode : { type: String, required: true},
    grade : { type: String, required: true}

},
//Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName method
{collection: 'myCourses'});

// Get specific course
myCoursesSchema.statics.getMyCourse = function (courseCode) {
    return this.findOne({courseCode : courseCode});
};


// Get all courses
myCoursesSchema.statics.getAllMyCourses = function () {
    return this.find({});
};

// Update my-course
myCoursesSchema.statics.updateMyCourse = function (courseCode, grade) {
    return this
        .findOneAndUpdate({courseCode : courseCode}, grade);
};

// delete a my-course
myCoursesSchema.statics.deleteMyCourse = function (courseCode) {
    return this
        .findOneAndRemove({courseCode : courseCode});
};

module.exports = mongoose.model('MyCourse', myCoursesSchema);



