export default function CarCard({ car }) {
  return (
    <div className="border rounded-xl shadow-sm p-4 flex flex-col gap-2 bg-white">
      <img
        src={car.image}
        alt={car.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="font-semibold text-lg">{car.title}</h3>
      <p className="text-gray-600">
        {car.year} • {car.mileage} miles
      </p>
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
