const express = require("express");
const router = express.Router();
let User = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });

  newUser.save()
    .then(() => {
      res.status(200).json("New User added");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
