import express from "express";
import multer from "multer";
import { addComment } from "../Controllers/commentController.js";

const router = express.Router();




const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.array("photos", 5), addComment); // max 5 photos

export default router;
