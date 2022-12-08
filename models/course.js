const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({

    courseCode: { type: String, required: true, unique: true },
    subjectCode: { type: String, required: true },
    level: { type: String, required: true },
    progression: { type: String, required: false},
    name: { type: String, required: true},
    points: { type: Number, required: true},
    institutionCode: { type: String, required: true},
    subject: { type: String, required: true}
});


coursesSchema.statics.getAllUsers = function () {
    return this.find({}); // find all documents
};

module.exports = mongoose.model('Course', coursesSchema);