import cloudinary from "../../Config/cloudinary.js";
import Comment from "../Models/Comment.js";
import Trail from "../Models/Trail.js";
import mongoose from "mongoose";

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

// Get all comments (forum comments) with optional category filter
export const getComments = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const comments = await Comment.find(query)
      .populate("userId", "fullName email")
      .populate("replies.userId", "fullName email")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new forum comment
export const createComment = async (req, res) => {
  try {
    console.log('Create comment request body:', req.body);
    console.log('Create comment request files:', req.files);
    console.log('User from request:', req.user);
    
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { content, category, trailId } = req.body;

    console.log('Content:', content, 'Category:', category, 'TrailId:', trailId);

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );
    }

    // Handle trailId: if it's a string (trail name), find the Trail and get its ObjectId
    let trailObjectId = null;
    if (trailId) {
      // Check if trailId is a valid MongoDB ObjectId
      if (mongoose.Types.ObjectId.isValid(trailId)) {
        trailObjectId = trailId;
      } else {
        // It's likely a trail name, find the Trail by name
        const trail = await Trail.findOne({ name: trailId });
        if (trail) {
          trailObjectId = trail._id;
        } else {
          // Trail not found in DB, store as string name (we'll need to update schema)
          // For now, let's create or find the trail
          // Actually, since trailId in Comment schema expects ObjectId, we should create the trail if it doesn't exist
          // OR we need to update the schema to accept string. Let's try to find/create the trail.
          console.log(`Trail "${trailId}" not found in database. Creating or using name as identifier.`);
          // For now, we'll skip trailId if trail doesn't exist, or store the trail name
          // But since schema expects ObjectId, we need to either:
          // 1. Create the trail if it doesn't exist
          // 2. Update schema to accept string
          // Let's go with option 1 - create trail if it doesn't exist
          const newTrail = await Trail.create({
            name: trailId,
            location: 'Unknown',
            description: 'Trail created automatically from comment',
            difficulty: 'Moderate'
          });
          trailObjectId = newTrail._id;
        }
      }
    }

    const comment = new Comment({
      userId,
      content: content.trim(),
      category: category || 'general',
      images: uploadedImages,
      likes: [],
      replies: [],
      ...(trailObjectId && { trailId: trailObjectId }), // Include trailId only if provided
    });

    await comment.save();
    
    // Populate user info before sending response
    await comment.populate("userId", "fullName email");

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Like a comment
export const likeComment = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const isLiked = comment.likes.includes(userId);

    if (isLiked) {
      // Unlike: remove user from likes array
      comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like: add user to likes array
      comment.likes.push(userId);
    }

    await comment.save();
    
    await comment.populate("userId", "fullName email");
    await comment.populate("replies.userId", "fullName email");

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reply to a comment
export const replyToComment = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Reply content is required" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Add reply
    comment.replies.push({
      userId,
      content: content.trim(),
    });

    await comment.save();
    
    await comment.populate("userId", "fullName email");
    await comment.populate("replies.userId", "fullName email");

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Legacy endpoints for trail comments (keeping for backward compatibility)
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
      userId: userId,
      trailId: trailId,
      content: description,
      images: uploadedPhotos,
      category: 'general',
      likes: [],
      replies: [],
    });

    await comment.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all comments for a specific trail
export const getCommentsByTrail = async (req, res) => {
  try {
    let { trailId } = req.params;
    
    // Decode URL-encoded trail name
    trailId = decodeURIComponent(trailId);

    // Validate trailId
    if (!trailId) {
      return res.status(400).json({ message: "Trail ID is required" });
    }

    // Check if trailId is a valid MongoDB ObjectId
    let trailObjectId = trailId;
    if (!mongoose.Types.ObjectId.isValid(trailId)) {
      // It's likely a trail name, find the Trail by name
      const trail = await Trail.findOne({ name: trailId });
      if (trail) {
        trailObjectId = trail._id;
      } else {
        // Trail not found - return empty array instead of error
        return res.status(200).json([]);
      }
    }

    // Query comments using the trail ObjectId
    const comments = await Comment.find({ trailId: trailObjectId })
      .populate("userId", "fullName email")
      .populate("replies.userId", "fullName email")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
