const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({

    subjectCode: { type: String, required: true},
    subject: { type: String, required: true },
    preamble: { type: String, required: false },
    bodyText: { type: String, required: false},
    language: { type: String, required: true},
  
});

// Get all subjects
subjectSchema.statics.getAllSubjects = function () {
    return this.find({});
};



// Get specific subject
subjectSchema.statics.getSubject = function (subjectCode) {
    return this.findOne({subjectCode : subjectCode});
};


module.exports = mongoose.model('Subject', subjectSchema);