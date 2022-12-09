const mongoose = require('mongoose');

var gradeSchema = new mongoose.Schema({

    name : { type: String, required: true},
    grades : { type: [String], required: true},
    descriptions : [{language : String, description : [String] }]

});


// Get all grades with name 'fa'
gradeSchema.statics.getAllGrades = function () {
    return this.find({name: 'fa'});
};


module.exports = mongoose.model('Grade', gradeSchema);