import express from "express";
import multer from "multer";
import { 
  getComments, 
  createComment, 
  likeComment, 
  replyToComment,
  addComment, 
  getCommentsByTrail 
} from "../Controllers/commentController.js";
import { verifyAccessToken } from "../Middlewares/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Forum comment routes (main routes for forum page)
router.get("/", getComments); // GET /api/comments (with optional ?category= query)
router.post("/", verifyAccessToken, upload.array("images", 5), createComment); // POST /api/comments
router.post("/:commentId/like", verifyAccessToken, likeComment); // POST /api/comments/:id/like
router.post("/:commentId/reply", verifyAccessToken, replyToComment); // POST /api/comments/:id/reply

// Legacy trail comment routes (for backward compatibility)
router.post("/add", upload.array("photos", 5), addComment);
router.get("/getbytrail/:trailId", getCommentsByTrail);

export default router;
