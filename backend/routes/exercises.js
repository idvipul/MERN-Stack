const express = require("express");
const router = express.Router();
let Exercise = require("../models/exercise");

router.get("/", (req, res) => {
    Exercise.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const { username, description, duration } = req.body;
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });

  newExercise.save()
    .then(() => {
      res.status(200).json("New User added");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
