const { Schema, Types, model } = require("mongoose");

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  let output =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return output;
};

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
      get: (timestamp) => formatDate(timestamp),
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
      get: (timestamp) => formatDate(timestamp),
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
  if (this.reaction) {
    return this.reaction.length;
  } else {
    return 0;
  }
});

// Initialize our Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
