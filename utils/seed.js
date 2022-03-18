const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");

mongoose
  .connect("mongodb://localhost:27017/allstar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected here");
  })
  .catch((err) => {
    console.log(err);
  });

const seedUsers = [
  {
    username: "doglover88",
    email: "doglover88@gmail.com",
    // thoughts: "1",
    // friends: "1, 2",
  },
  {
    username: "catperson5",
    email: "catperson5@gmail.com",
    // thoughts: "2",
    // friends: "1, 2",
  },
];

const seedThoughts = [
  {
    thoughtText: "Sometimes I really wonder why the sky is blue.",
    username: "doglover88",
    reactions: {
      reactionBody: "Whoa, so do I!",
      username: "catperson5",
    },
  },
  {
    thoughtText: "What on earth is 2+2?",
    username: "catperson5",
    reactions: {
      reactionBody: "It's definitely 4!",
      username: "doglover88",
    },
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
  await Thought.deleteMany({});
  await Thought.insertMany(seedThoughts);
};

seedDB().then(() => {
  mongoose.connection.close();
});
