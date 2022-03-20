const router = require("express").Router();

//Routes for users & friends
const userRoutes = require("./userRoutes");
const friendRoutes = require("./friendRoutes");

//Routes for thoughts & reactions
const thoughtRoutes = require("./thoughtRoutes");
const reactionRoutes = require("./reactionRoutes");

//Use routes
router.use("/users", userRoutes, friendRoutes);
router.use("/thoughts", thoughtRoutes, reactionRoutes);

module.exports = router;
