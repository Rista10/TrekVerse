import express from "express";
import { addTrail , getAllTrails , getTrailById} from "../Controllers/trailController.js";
import multer from "multer";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.array("images", 5), addTrail); 
router.get('/trails', getAllTrails);
router.get('/trails/:id', getTrailById);

export default router;
