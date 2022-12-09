const routes = require('express').Router();
const Grade = require('../models/grade');


// Get all grades (A-F)
routes.get("/api/grades", async (req, res) => {
	Grade.getAllGrades()
        .then(grades => res.status(200).json(grades[0].grades));
})

module.exports = routes;