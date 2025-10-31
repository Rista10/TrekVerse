import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    trail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trail", 
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    photoUrls: [
      {
        type: String, // store Cloudinary URLs
      },
    ],
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Comment", commentSchema);
