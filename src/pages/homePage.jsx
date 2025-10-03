import { useState } from "react";
import { Search, DollarSign, Calendar, MapPin, Gauge } from "lucide-react";

function CarCard({ car }) {
  return (
    <div className="border rounded-xl shadow-sm p-4 flex flex-col gap-2 bg-white">
      <img
        src={car.image}
        alt={car.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="font-semibold text-lg">{car.title}</h3>
      <p className="text-gray-600">{car.year} • {car.mileage} miles</p>
      <p className="font-bold text-blue-600">${car.price}</p>
      <a
        href={car.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-center"
      >
        View Listing
      </a>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Dummy data for now
    setResults([
      {
        id: 1,
        title: "2018 Toyota Camry",
        year: 2018,
        mileage: 45000,
        price: 18500,
        image: "https://via.placeholder.com/300x200.png?text=Toyota+Camry",
        url: "https://cars.com",
      },
      {
        id: 2,
        title: "2020 Honda Accord",
        year: 2020,
        mileage: 30000,
        price: 22000,
        image: "https://via.placeholder.com/300x200.png?text=Honda+Accord",
        url: "https://autotrader.com",
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <h1 className="text-xl font-semibold">CarFinder</h1>
        <nav className="flex gap-6">
          <a href="#" className="text-gray-700 hover:text-black">Home</a>
          <a href="#" className="text-gray-700 hover:text-black">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center text-center mt-16 px-4">
        <h2 className="text-3xl font-bold mb-2">Find the right car faster</h2>
        <p className="text-gray-600 mb-8">
          Search across marketplaces and dealers in one place
        </p>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search cars..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Search size={18} /> Search
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <DollarSign size={18} className="text-gray-500" />
              <span className="text-gray-600">Price</span>
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-gray-600">Year</span>
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <MapPin size={18} className="text-gray-500" />
              <span className="text-gray-600">Location</span>
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Gauge size={18} className="text-gray-500" />
              <span className="text-gray-600">Mileage</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-12 w-full max-w-5xl">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 bg-white p-6 rounded-xl shadow-sm">
              Your results will appear here after you search!
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-center px-6 py-4 border-t text-sm text-gray-500">
        <p>©2025 CarFinder</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-black">About</a>
          <a href="#" className="hover:text-black">Privacy</a>
          <a href="#" className="hover:text-black">Terms</a>
        </div>
      </footer>
    </div>
  );
}