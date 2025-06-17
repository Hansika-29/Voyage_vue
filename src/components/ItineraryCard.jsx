import React from "react";

export default function ItineraryCard({ itinerary, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-xl p-4 border flex flex-col sm:flex-row items-center gap-4"
    >
      <img
        src={itinerary.image || `https://source.unsplash.com/400x200/?${itinerary.cities[0]}`}
        alt={itinerary.cities.join(", ")}
        className="w-full sm:w-64 h-40 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-indigo-700">
          {itinerary.cities.join(", ")}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{itinerary.country}</p>
        <p className="text-gray-700 text-sm">
          {itinerary.days} days • ₹{itinerary.pricePerDay}/person/day
        </p>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {itinerary.summary}
        </p>
      </div>
    </div>
  );
}
