const router = require("express").Router();
const Thought = require("../../models/Thought");

//POST new thought
router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(200).json(newThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughtData = await Thought.find({});
    console.log(thoughtData);
    res.status(200).json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET a single thought by its _id
router.get("/:thoughtId", async (req, res) => {
  try {
    const thoughtData = await Thought.findById(req.params.thoughtId);
    res.json(thoughtData);
  } catch (err) {
    res.status(500).json();
  }
});

//UPDATE a thought by its _id
router.put("/:thoughtId", async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { ...req.body }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "No user with this id." });
      return;
    }
    res.status(200).json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//DELETE a thought by its _id
router.delete("/:thoughtId", async (req, res) => {
  try {
    const thoughtData = await Thought.deleteOne({
      where: { _id: req.params.thoughtId },
    });
    if (!thoughtData) {
      res.status(404).json({ message: "User with this ID not found." });
      return;
    }
    console.log(`${thoughtData} DELETED.`);
    res.status(200).json(thoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
