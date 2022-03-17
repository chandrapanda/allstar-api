const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { seedUsers, seedThoughts } = require("./data");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Empty arrays for users and thoughts
  const users = [];
  const thoughts = [];

  // Wait for the users to be inserted into the database
  await User.collection.insertMany(users);

  //Wait for the thoughts to be inserted into the database
  await Thought.collection.insertMany(thoughts);

  // Log out a pretty table for comments and posts
  console.table(users);
  console.table(thoughts);
  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});
