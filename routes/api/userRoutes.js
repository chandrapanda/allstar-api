const router = require("express").Router();
const User = require("../../models/User");

//POST new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET all users
router.get("/", async (req, res) => {
  console.log("hi");
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

//UPDATE user by its _id
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.userId },
    });
    if (!updatedUser) {
      res.status(404).json({ message: "No user with this id." });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//DELETE user by its _id
router.delete("/:userId", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: { id: req.params.userId },
    });
    if (!userData) {
      res.status(404).json({ message: "User with this ID not found." });
      return;
    }
    console.log(`${userData} DELETED.`);
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
