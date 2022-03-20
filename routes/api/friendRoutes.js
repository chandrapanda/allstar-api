const router = require("express").Router();
const User = require("../../models/User");

// CREATE a new friend in user's friend list
router.post("/:userId/friends/"),
  async (req, res) => {
    try {
      const newFriend = await User.create(req.body);
      res.status(200).json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

// DELETE a friend from user's friend list
router.delete("/:userId/friends/:friendId"),
  async (req, res) => {
    try {
      const friendData = await User.deleteOne({
        where: { id: req.params.friendId },
      });
      if (!friendData) {
        res.status(404).json({ message: "User with this ID not found." });
        return;
      }
      console.log(`${friendData} DELETED.`);
      res.status(200).json(friendData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  };
module.exports = router;
