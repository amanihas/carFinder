export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      <img
        src={car.image || "/placeholder-car.jpg"}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h2 className="text-xl font-bold mt-2">
        {car.year} {car.make} {car.model}
      </h2>
      <p className="text-gray-600">{car.class}</p>
      <p className="text-sm text-gray-500">
        {car.transmission} • {car.drive} • {car.fuel_type}
      </p>
    </div>
  );
}
