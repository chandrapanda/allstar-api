const { Schema, Types, model } = require("mongoose");
const { formatDate } = require("../utils/dateFormat");

// Schema for Reaction model (subdocument of Thought model)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => formatDate(timeStamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => formatDate(timeStamp),
    },
    username: {
      type: String,
      required: true,
    },
    //Subdocument imported here
    reactions: [reactionSchema],
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
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
