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

// const connection = require("../config/connection");
// const { User, Thought } = require("../models");
// const { userData, thoughtData } = require("./data");

// connection.on("error", (err) => err);

// // Start the seeding runtime timer
// console.time("seeding");

// // Creates a connection to mongodb
// connection.once("open", async () => {
//   // Delete the entries in the collection
//   await User.deleteMany({});
//   await Thought.deleteMany({});

//   // Empty arrays for users and thoughts
//   // const userData;
//   // const thoughtData;

//   // Wait for the users to be inserted into the database

//   await User.collection.insertMany(userData);

//   //Wait for the thoughts to be inserted into the database
//   await Thought.collection.insertMany(thoughtData);

//   // Log out a pretty table for users and thoughts
//   console.table(userData);
//   console.table(thoughtData);
//   console.timeEnd("seeding complete 🌱");
//   process.exit(0);
// });
