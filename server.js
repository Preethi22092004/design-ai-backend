const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
require('dotenv').config();  
const stabilityApiKey = process.env.STABILITY_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// POST endpoint to handle image upload and preferences
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    const { preferences } = req.body;
    const { color, theme, furniture } = JSON.parse(preferences);
    const image = req.file;

    // Prepare data for AI Image Generation API
    const formData = new FormData();
    formData.append("image", fs.createReadStream(image.path));
    formData.append("preferences", JSON.stringify({ color, theme, furniture }));

    // Call Stability AI or Gemini API
    const apiResponse = await axios.post("YOUR_API_ENDPOINT", formData, {
      headers: {
        "Authorization": `Bearer YOUR_API_KEY`,
        ...formData.getHeaders(),
      },
    });

    // Send the generated image URL back to the frontend
    res.json({ image: apiResponse.data.imageUrl });

    // Cleanup uploaded file
    fs.unlinkSync(image.path);
  } catch (error) {
    console.error("Error generating image", error);
    res.status(500).json({ error: "Error generating image" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
