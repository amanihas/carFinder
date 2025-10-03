// Placeholder – later replace with scraping or API integration
export async function fetchCars({ query, year, mileage, location, price }) {
  return [
    {
      id: 1,
      title: "2019 Ford Fusion",
      year: 2019,
      mileage: 36000,
      price: 17000,
      image: "https://via.placeholder.com/300x200.png?text=Ford+Fusion",
      url: "https://cars.com",
    },
    {
      id: 2,
      title: "2021 Nissan Altima",
      year: 2021,
      mileage: 12000,
      price: 25000,
      image: "https://via.placeholder.com/300x200.png?text=Nissan+Altima",
      url: "https://autotrader.com",
    },
  ];
}
