import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    trailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trail",
      required: false, // Optional for forum comments
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: ['general', 'incident', 'tip', 'question'],
      default: 'general',
      required: true,
    },
    images: [
      {
        type: String, // store Cloudinary URLs
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [replySchema],
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Comment", commentSchema);
