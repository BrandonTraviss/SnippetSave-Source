import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String],
      default: [],
    },

    // NEW FIELD — stores user IDs who favorited this snippet
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  { timestamps: true }
);

// Index for fast "get all favorites for a user" queries
snippetSchema.index({ favoritedBy: 1 });

export default mongoose.model("Snippet", snippetSchema);
