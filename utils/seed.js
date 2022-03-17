const connection = require("../config/connection");
const { User, Thought, Post } = require("../models");
const { seedUsers, seedPosts, seedThoughts } = require("./data");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Comment.deleteMany({});

  // Empty arrays for randomly generated posts and comments
  const comments = [...getRandomComments(10)];
  const posts = [];

  // Makes comments array
  const makePost = (text) => {
    posts.push({
      text,
      username: getRandomName().split(" ")[0],
      comments: [comments[genRandomIndex(comments)]._id],
    });
  };

  // Wait for the comments to be inserted into the database
  await User.collection.insertMany(users);

  // For each of the comments that exist, make a random post of 10 words
  users.forEach(() => makePost(getRandomPost(10)));

  // Wait for the posts array to be inserted into the database
  await Post.collection.insertMany(posts);

  // Log out a pretty table for comments and posts
  console.table(users);
  console.table(posts);
  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});
