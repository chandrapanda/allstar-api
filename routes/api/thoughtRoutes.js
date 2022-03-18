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
    res.json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET a single thought by its _id

//UPDATE a thought by its _id

//DELETE a thought by its _id

//CREATE a reaction stored in a single thought's Reactions array field

//DELETE a reaction by reactionId value

module.exports = router;
