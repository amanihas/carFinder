// src/components/CarCard.jsx
import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 max-w-xs w-full hover:shadow-lg transition">
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        {car.make?.toUpperCase()} {car.model} ({car.year})
      </h2>

      <p className="text-gray-600 text-sm mb-1">Fuel: {car.fuel_type}</p>
      <p className="text-gray-600 text-sm mb-1">Drive: {car.drive}</p>
      <p className="text-gray-600 text-sm mb-1">Transmission: {car.transmission}</p>
      <p className="text-gray-600 text-sm mb-1">Cylinders: {car.cylinders}</p>
      <p className="text-gray-600 text-sm mb-1">Class: {car.class}</p>
      <p className="text-gray-600 text-sm mb-1">Displacement: {car.displacement} L</p>
      <p className="text-gray-800 font-medium mt-2">📍 {car.location}</p>
    </div>
  );
};

export default CarCard;
