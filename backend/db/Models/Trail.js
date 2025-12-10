import mongoose from 'mongoose';

const trailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Hard'],
      default: 'Moderate',
    },
    duration: {
      type: String, 
    },
    distance: {
      type: Number, 

    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String, // image URLs from Cloudinary or similar
      },
    ],
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    }
  },
  { timestamps: true }
);

// Add index for name lookups (used frequently in comment controller)
trailSchema.index({ name: 1 });

export default mongoose.model('Trail', trailSchema);
