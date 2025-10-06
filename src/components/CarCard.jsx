// src/components/CarCard.jsx
export default function CarCard({ car }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {car.image ? (
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {car.make} {car.model}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{car.type}</p>

        <div className="flex justify-between text-gray-700 text-sm">
          <p>
            <span className="font-medium">Cost:</span>{" "}
            {car.cost ? `$${car.cost.toLocaleString()}` : "N/A"}
          </p>
          <p>
            <span className="font-medium">Mileage:</span>{" "}
            {car.mileage ? `${car.mileage.toLocaleString()} mi` : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
