// Dependencies
const router = require("express").Router();

const Workout = require("../models/Workout.js");

// route to add workouts to database
router.post("/api/workouts", (req, res) => {
    Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });






module.exports = router;