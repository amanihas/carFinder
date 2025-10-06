// src/pages/Home.jsx
import { useState } from "react";
import { Search, DollarSign, Calendar, Gauge } from "lucide-react";
import CarCard from "../components/CarCard";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a car make or model");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/cars?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("No cars found.");
      }

      setCars(data);
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

      {/* Hero */}
      <section className="text-center py-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-2">Find the right car faster</h2>
        <p className="text-gray-500">
          Search across real listings and images using our live database
        </p>
      </section>

      {/* Search Box */}
      <section className="max-w-3xl mx-auto w-full px-4">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search (e.g. Toyota Corolla)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
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
