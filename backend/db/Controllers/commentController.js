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

    const { content, category } = req.body;

    console.log('Content:', content, 'Category:', category);

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );
    }

    const comment = new Comment({
      userId,
      content: content.trim(),
      category: category || 'general',
      images: uploadedImages,
      likes: [],
      replies: [],
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
    const { trailId } = req.params;

    // Validate trailId
    if (!trailId) {
      return res.status(400).json({ message: "Trail ID is required" });
    }

    const comments = await Comment.find({ trailId: trailId })
      .populate("userId", "fullName email")
      .populate("replies.userId", "fullName email")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
