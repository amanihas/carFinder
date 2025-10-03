// server/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * Fetch cars from Auto.dev Listings API
 */
async function fetchFromAutoDev(filters) {
  try {
    const res = await axios.get("https://auto.dev/api/listings", {
      params: {
        make: filters.brand,
        year: filters.year,
        mileage_max: filters.mileage,
        price_max: filters.price,
        city: filters.location,
        limit: 10, // keep results manageable
      },
      headers: {
        "Authorization": `Bearer ${process.env.AUTO_DEV_API_KEY}`,
      },
    });

    // Normalize API response for frontend
    return res.data.listings.map((car) => ({
      id: car.id,
      brand: car.make,
      model: car.model,
      year: car.year,
      mileage: car.mileage,
      price: car.price,
      location: car.dealer?.city || "Unknown",
      image: car.media?.photo_links?.[0] || "https://via.placeholder.com/400x250",
      url: car.vdp_url || "#",
    }));
  } catch (err) {
    console.error("Error fetching Auto.dev listings:", err.message);
    return [];
  }
}

app.get("/api/cars/search", async (req, res) => {
  const { brand, year, mileage, price, location } = req.query;
  const filters = { brand, year, mileage, price, location };

  // Use Auto.dev first
  const cars = await fetchFromAutoDev(filters);

  // If no results, fallback to mock
  if (cars.length === 0) {
    return res.json([
      {
        id: 1,
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        mileage: 20000,
        price: 18000,
        location: "Orlando, FL",
        image: "https://via.placeholder.com/400x250?text=Toyota+Camry",
        url: "https://example.com/listing/1",
      },
    ]);
  }

  res.json(cars);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
