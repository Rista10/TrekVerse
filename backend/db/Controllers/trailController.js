import cloudinary from "../../Config/cloudinary.js";
import Trail from "../Models/Trail.js";

// helper to upload a single file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "trails" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer); // send the buffer to Cloudinary
  });
};

export const addTrail = async (req, res) => {
  try {
    const { name, location, description, difficulty, distance, duration, createdBy } = req.body;

    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      // upload all files concurrently
      uploadedImages = await Promise.all(req.files.map(file => uploadToCloudinary(file.buffer)));
    }

    const newTrail = new Trail({
      name,
      location,
      description,
      difficulty,
      distance,
      duration,
      images: uploadedImages,
      createdBy,
    });

    await newTrail.save();

    res.status(201).json({ message: "Trail added successfully", trail: newTrail });
  } catch (error) {
    console.error("Error adding trail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add this to your trail controller file

export const getAllTrails = async (req, res) => {
  try {
    const trails = await Trail.find().sort({ createdAt: -1 }); // newest first
    
    res.status(200).json({ 
      message: "Trails fetched successfully", 
      trails 
    });
  } catch (error) {
    console.error("Error fetching trails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Optional: Get a single trail by ID
export const getTrailById = async (req, res) => {
  try {
    const { id } = req.params;
    const trail = await Trail.findById(id);
    
    if (!trail) {
      return res.status(404).json({ message: "Trail not found" });
    }
    
    res.status(200).json({ 
      message: "Trail fetched successfully", 
      trail 
    });
  } catch (error) {
    console.error("Error fetching trail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};