const mongoose = require('mongoose');

var gradeSchema = new mongoose.Schema({

    name : { type: String, required: true},
    grades : { type: [String], required: true},
    descriptions : [{language : String, description : [String] }]

});


// // Get all grades
gradeSchema.statics.getAllGrades = function () {
    return this.find({name: 'fa'});
};

// const grades = await Grades.find({ name : 'fa'}, {'grades' : 1, '_id': 0})
	
// 	res.json(grades[0].grades)

module.exports = mongoose.model('Grade', gradeSchema);