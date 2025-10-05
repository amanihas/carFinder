import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

app.get("/api/cars", async (req, res) => {
  const { make, model } = req.query;
  console.log(`🔍 Searching for: ${make} ${model}`);

  try {
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}`;
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error("❌ Invalid response:", data);
      return res.status(500).json({ error: "Invalid API response" });
    }

    // 🧹 Clean and format data
    const cleanData = data.map((car) => {
      const cleanCar = { ...car };

      // Remove premium-only placeholders
      Object.keys(cleanCar).forEach((key) => {
        if (
          typeof cleanCar[key] === "string" &&
          cleanCar[key].includes("premium subscribers only")
        ) {
          cleanCar[key] = "N/A";
        }
      });

      // Add a random realistic city for display
      const cities = ["Orlando", "Miami", "Tampa", "Jacksonville", "Tallahassee"];
      cleanCar.location = cities[Math.floor(Math.random() * cities.length)];

      return cleanCar;
    });

    res.json(cleanData);
  } catch (error) {
    console.error("❌ Error fetching cars:", error.message);
    res.status(500).json({ error: "Error fetching car data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

