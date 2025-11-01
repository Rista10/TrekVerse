import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./db/config.js";
import authRoutes from "./db/Routes/authRoutes.js";
import trailRoutes from "./db/Routes/trailRoutes.js";
import commentRoutes from "./db/Routes/commentRoutes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 5050;
const allowedOrigin = "http://localhost:3000";

 
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

 
connectDB();

 
app.get("/", (req, res) => {
  res.send("TrekVerse backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/trails", trailRoutes);
app.use("/api/comments", commentRoutes);

 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/itinerary", async (req, res) => {
  try {
    const { destination, days, people, budget, month } = req.body;

    const prompt = `
    Generate a clean, professional travel itinerary (no conversational tone, no "Okay here’s" intros)
    for a trekking trip in Nepal.

    Details:
    - Destination: ${destination}
    - Duration: ${days} days
    - Travelers: ${people} people
    - Budget: ${budget}
    - Month: ${month}

    Format it with markdown-like headings and lists:
    - Title at the top
    - "Overview" section
    - "Day-wise Plan" section
    - "Budget Breakdown"
    - "Important Notes"
    - Avoid extra explanations or apologies.
    Output only the formatted itinerary.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let itinerary = result.response.text();

    
    itinerary = itinerary.replace(/^Okay.*?\n/i, "").trim();

    res.json({ itinerary });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

 
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
