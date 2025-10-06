// server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
const PORT = 5000;

app.get("/api/cars", async (req, res) => {
  const make = req.query.make?.toLowerCase() || "";
  const model = req.query.model?.toLowerCase() || "";
  console.log(`🔍 Searching for: make=${make}, model=${model}`);

  if (!make) return res.status(400).json({ error: "Missing 'make' parameter" });

  try {
    // Fetch all models for the given make
    const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(
      make
    )}?format=json`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.Results || data.Results.length === 0) {
      return res.json({ cars: [] });
    }

    // Filter results if a specific model is requested
    let cars = data.Results;
    if (model) {
      cars = cars.filter((c) =>
        c.Model_Name.toLowerCase().includes(model.toLowerCase())
      );
    }

    // Limit and enrich results
    const listings = await Promise.all(
      cars.slice(0, 10).map(async (car) => {
        const searchTerm = `${car.Make_Name} ${car.Model_Name}`;
        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          searchTerm
        )}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&per_page=1`;

        try {
          const imgRes = await fetch(unsplashUrl);
          const imgData = await imgRes.json();
          const imageUrl = imgData.results?.[0]?.urls?.small || null;

          // Add placeholder cost/mileage for demonstration
          const fakeCost = Math.floor(Math.random() * 30000) + 10000; // $10k–$40k
          const fakeMileage = Math.floor(Math.random() * 120000) + 5000; // 5k–125k miles

          return {
            make: car.Make_Name,
            model: car.Model_Name,
            type: car.VehicleTypeName || "Car",
            cost: fakeCost,
            mileage: fakeMileage,
            image: imageUrl,
          };
        } catch {
          return {
            make: car.Make_Name,
            model: car.Model_Name,
            cost: null,
            mileage: null,
            image: null,
          };
        }
      })
    );

    res.json({ cars: listings });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

