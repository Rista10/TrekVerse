import cloudinary from "../../Config/cloudinary.js";
import Comment from "../Models/Comment.js";


const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "comments" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

export const addComment = async (req, res) => {
  try {
    const { trailId, description, userId } = req.body;

    if (!description && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    let uploadedPhotos = [];
    if (req.files && req.files.length > 0) {
      uploadedPhotos = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );
    }

    const comment = new Comment({
      user: userId,
      trail: trailId,
      description,
      photoUrls: uploadedPhotos,
    });

    await comment.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
