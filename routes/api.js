// Dependencies
const router = require("express").Router();

const Workout = require("../models/Workout.js");

// route to add workouts to database
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// adding exercise
router.put("/api/workouts/:id", (req, res) => {
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      //The $inc operator increments a field by a specified value
      $inc: { totalDuration: req.body.duration },
      //The $push operator appends a specified value to an array.
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//to get last workout
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      console.log("test", dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//to grab all workouts
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
