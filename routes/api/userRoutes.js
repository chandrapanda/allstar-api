const router = require("express").Router();
const User = require("../../models");

//GET all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.find({});
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET a single user by its _id
router.get("/:userId", async (req, res) => {
  try {
    const userData = await User.findById(req.params.userId);
    res.json(userData);
  } catch (err) {
    res.status(500).json();
  }
});

//POST a new user

module.exports = router;
