// src/components/CarCard.jsx
import { MapPin, Gauge, Calendar, DollarSign } from "lucide-react";

export default function CarCard({ car }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col">
      <img
        src={car.image || "https://via.placeholder.com/400x250"}
        alt={`${car.brand} ${car.model}`}
        className="rounded-lg h-48 w-full object-cover mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {car.year} {car.brand} {car.model}
      </h2>
      <div className="flex flex-wrap gap-3 text-gray-600 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={16} /> {car.year}
        </div>
        <div className="flex items-center gap-1">
          <Gauge size={16} /> {car.mileage.toLocaleString()} mi
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={16} /> ${car.price.toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} /> {car.location}
        </div>
      </div>
      // src/components/CarCard.jsx
    <button
    onClick={() => window.open(car.url, "_blank")}
    className="mt-auto bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
    >
    View Listing
    </button>
    </div>
  );
}
