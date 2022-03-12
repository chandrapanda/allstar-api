const { Schema, model } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: String,
    createdAt: { type: Date, default: Date.now },
    username: String,
    reactions: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Creates a virtual property `reactionCount` that gets the length of thought's reactions array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
