import React from "react";

const sampleItineraries = [
  {
    id: 1,
    title: "Bali Bliss",
    days: 6,
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1551918120-9739cb430bb4?auto=format&fit=crop&w=500&q=60",
    itinerary: [
      "Arrival and relax at the resort",
      "Visit Uluwatu Temple & beaches",
      "Explore rice terraces & local culture",
      "Adventure activities & markets",
      "Beach day and spa treatment",
      "Departure with souvenirs"
    ]
  },
  {
    id: 2,
    title: "Swiss Adventure",
    days: 7,
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=500&q=60",
    itinerary: [
      "Arrival in Zurich",
      "Train to Interlaken & explore",
      "Jungfraujoch mountain trip",
      "Luzern lake cruise",
      "Zermatt and Matterhorn views",
      "Cheese & chocolate tour",
      "Departure from Geneva"
    ]
  },
  {
    id: 3,
    title: "Tokyo Explorer",
    days: 5,
    country: "Japan",
    image: "https://images.unsplash.com/photo-1561649964-bd03fe80caec?auto=format&fit=crop&w=500&q=60",
    itinerary: [
      "Arrival in Tokyo & Shibuya crossing",
      "Asakusa temple + street food",
      "Anime & tech districts",
      "Day trip to Mt. Fuji",
      "Shopping & fly home"
    ]
  }
];

export default function Carousel({ onCardClick }) {
  return (
    <div className="overflow-x-auto flex space-x-6 p-4 pb-6">
      {sampleItineraries.map((item) => (
        <div
          key={item.id}
          onClick={() => onCardClick(item)}
          className="min-w-[300px] max-w-sm bg-white shadow-md rounded-xl cursor-pointer hover:scale-105 transform transition border overflow-hidden"
        >
          {/* Image at top */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover"
          />

          {/* Text content */}
          <div className="p-4 text-left">
            <h2 className="text-xl font-bold text-indigo-600">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.country}</p>
            <p className="mt-2 text-gray-800">Duration: {item.days} Days</p>
            <p className="text-sm text-indigo-500 mt-2">Click to view details →</p>
          </div>
        </div>
      ))}
    </div>
  );
}
