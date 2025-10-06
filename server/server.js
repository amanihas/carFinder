import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
const PORT = 5000;

app.get("/api/cars", async (req, res) => {
  const query = req.query.query?.toLowerCase() || "";
  console.log(`🔍 Searching for: ${query}`);

  if (!query) return res.status(400).json({ error: "Missing query parameter" });

  try {
    // --- Fetch cars by make or model ---
    const carUrl = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${encodeURIComponent(
      query
    )}`;
    const carResponse = await fetch(carUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    });

    if (!carResponse.ok) {
      const text = await carResponse.text();
      throw new Error(`Car API error: ${text}`);
    }

    const cars = await carResponse.json();

    // If empty result, fallback to mock data
    if (!cars.length) {
      console.log("⚠️ No cars found, returning mock data.");
      return res.json([]);
    }

    // --- Fetch image for each car using Unsplash ---
    const listings = await Promise.all(
      cars.slice(0, 5).map(async (car) => {
        const searchTerm = `${car.make} ${car.model}`;
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          searchTerm
        )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=1`;

        try {
          const imgResponse = await fetch(unsplashUrl);
          const imgData = await imgResponse.json();
          const imageUrl = imgData.results?.[0]?.urls?.small || null;

          return {
            make: car.make,
            model: car.model,
            year: car.year,
            class: car.class,
            drive: car.drive,
            fuel_type: car.fuel_type,
            transmission: car.transmission,
            image: imageUrl,
          };
        } catch (err) {
          console.error(`❌ Image fetch error for ${searchTerm}:`, err);
          return { ...car, image: null };
        }
      })
    );

    res.json(listings);
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
