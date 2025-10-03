import express from "express";
import { fetchCars } from "../services/scraper.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const { query, year, mileage, location, price } = req.query;
  try {
    const results = await fetchCars({ query, year, mileage, location, price });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

export default router;
