// src/pages/Home.jsx
import { useState } from "react";
import { Search, DollarSign, Gauge } from "lucide-react";
import CarCard from "../components/CarCard";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minCost: "",
    maxCost: "",
    minMileage: "",
    maxMileage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!filters.make.trim()) {
      setError("Please enter a car make (e.g., Toyota)");
      return;
    }

    setLoading(true);
    setError("");
    setCars([]);

    try {
      const params = new URLSearchParams({
        make: filters.make,
        model: filters.model,
      }).toString();

      const res = await fetch(`http://localhost:5000/api/cars?${params}`);
      const data = await res.json();

      if (!data.cars || data.cars.length === 0) {
        setError("No cars found.");
      } else {
        let results = data.cars;

        // Client-side cost/mileage filtering
        results = results.filter((car) => {
          const { minCost, maxCost, minMileage, maxMileage } = filters;
          const costOk =
            (!minCost || car.cost >= Number(minCost)) &&
            (!maxCost || car.cost <= Number(maxCost));
          const mileageOk =
            (!minMileage || car.mileage >= Number(minMileage)) &&
            (!maxMileage || car.mileage <= Number(maxMileage));
          return costOk && mileageOk;
        });

        setCars(results);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
        <h1 className="text-xl font-bold text-blue-600">CarFinder</h1>
        <nav className="space-x-6 text-gray-700 font-medium">
          <a href="#">Home</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-2">Find the right car faster</h2>
        <p className="text-gray-500">
          Search across real listings and images using our live database
        </p>
      </section>

      {/* Search & Filters */}
      <section className="max-w-3xl mx-auto w-full px-4">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Make */}
            <input
              type="text"
              placeholder="Car Make (e.g., Toyota)"
              value={filters.make}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, make: e.target.value }))
              }
              className="border rounded-xl px-4 py-2 focus:outline-none"
            />

            {/* Model */}
            <input
              type="text"
              placeholder="Car Model (e.g., Corolla)"
              value={filters.model}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, model: e.target.value }))
              }
              className="border rounded-xl px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Cost Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <DollarSign size={18} className="text-gray-500" />
              <input
                type="number"
                placeholder="Min Cost"
                value={filters.minCost}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minCost: e.target.value }))
                }
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <DollarSign size={18} className="text-gray-500" />
              <input
                type="number"
                placeholder="Max Cost"
                value={filters.maxCost}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxCost: e.target.value }))
                }
                className="w-full outline-none"
              />
            </div>

            {/* Mileage Filters */}
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <Gauge size={18} className="text-gray-500" />
              <input
                type="number"
                placeholder="Min Mileage"
                value={filters.minMileage}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, minMileage: e.target.value }))
                }
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
              <Gauge size={18} className="text-gray-500" />
              <input
                type="number"
                placeholder="Max Mileage"
                value={filters.maxMileage}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, maxMileage: e.target.value }))
                }
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 w-full justify-center"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-5xl mx-auto w-full px-4 mt-10 flex-1">
        {loading && (
          <div className="text-center text-gray-500">Loading results...</div>
        )}

        {error && !loading && (
          <div className="bg-red-100 text-red-600 text-center py-4 rounded-xl">
            {error}
          </div>
        )}

        {!loading && !error && cars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </div>
        )}

        {!loading && !error && cars.length === 0 && (
          <div className="bg-gray-100 text-gray-500 text-center py-12 rounded-xl">
            Your results will appear here after you search!
          </div>
        )}
      </section>
    </div>
  );
}
