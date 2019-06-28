const express = require("express");
const router = express.Router();
let Exercise = require("../models/exercise");

router.get("/", (req, res) => {
  Exercise.find()
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });

  newExercise.save()
    .then(() => res.status(200).json("New Exercise added"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.status(200).json(exercise))
        .catch(err => res.status(400).json("Error: " + err));
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json(200).json("Exercise Deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then((exercise) => res.status(200).json("Exercise Updated " + exercise))
                .catch(err => res.status(400).json("Error: " + err));
        })
});    

module.exports = router;