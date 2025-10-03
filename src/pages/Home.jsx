// src/pages/Home.jsx
import { useState } from "react";
import { Search, DollarSign, Calendar, MapPin, Gauge } from "lucide-react";
import CarCard from "../components/CarCard";

export default function Home() {
  const [cars, setCars] = useState([]);

  const handleSearch = async () => {
    // TODO: connect to backend API
    setCars([
      {
        id: 1,
        title: "2019 Ford Fusion",
        year: 2019,
        mileage: 36000,
        price: 17000,
        image: "https://via.placeholder.com/300x200.png?text=Ford+Fusion",
        url: "https://cars.com",
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 border-b bg-white">
        <h1 className="text-xl font-bold">CarFinder</h1>
        <nav className="space-x-6 text-gray-700 font-medium">
          <a href="#">Home</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-2">Find the right car faster</h2>
        <p className="text-gray-500">
          Search across marketplaces and dealers in one place
        </p>
      </section>

      {/* Search Box */}
      <section className="max-w-3xl mx-auto w-full px-4">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search..."
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

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 text-gray-500">
              <DollarSign size={18} /> Price
            </div>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 text-gray-500">
              <Calendar size={18} /> Year
            </div>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 text-gray-500">
              <MapPin size={18} /> Location
            </div>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 text-gray-500">
              <Gauge size={18} /> Mileage
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-5xl mx-auto w-full px-4 mt-10 flex-1">
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 text-gray-500 text-center py-12 rounded-xl">
            Your results will appear here after you search!
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center px-8 py-4 border-t text-gray-500 text-sm">
        <span>©2025 CarFinder</span>
        <div className="space-x-4">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}
