import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ TrekVerse backend is running!");
});


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

    // Remove any conversational leftovers
    itinerary = itinerary.replace(/^Okay.*?\n/i, "").trim();

    res.json({ itinerary });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

app.listen(5050, () => console.log(" Server running on http://localhost:5050"));
