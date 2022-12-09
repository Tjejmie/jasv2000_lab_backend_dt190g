const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({

    courseCode: { type: String, required: true, unique: true },
    subjectCode: { type: String, required: true },
    level: { type: String, required: true },
    progression: { type: String, required: false},
    name: { type: String, required: true},
    points: { type: Number, required: true},
    institutionCode: { type: String, required: true},
    subject: { type: String, required: true},
    

});


// Get all courses
coursesSchema.statics.getAllCourses = function () {
    return this.find({});
};



// Get specific course
coursesSchema.statics.getCourse = function (courseCode) {
    return this.findOne({courseCode : courseCode});
};



module.exports = mongoose.model('Course', coursesSchema);

