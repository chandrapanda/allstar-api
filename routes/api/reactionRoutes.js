const router = require("express").Router();
const Thought = require("../../models/Thought");

//CREATE a reaction stored in a single thought's Reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const newReaction = await Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      { $addToSet: { reactions: req.body } }
    );
    res.status(200).json(newReaction);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE a reaction by reactionId value
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const reactionData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    );
    if (!reactionData) {
      res.status(404).json({ message: "Reaction with this ID not found." });
      return;
    }
    console.log(`${reactionData} DELETED.`);
    res.status(200).json(reactionData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
