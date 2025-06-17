import React from "react";

// Static imports (fallbacks and common cities)
import defaultImg from "../assets/images/default.jpg";
import parisImg from "../assets/images/paris.jpg";
import japanImg from "../assets/images/japan.jpg";
import londonImg from "../assets/images/london.jpg";
import italyImg from "../assets/images/italy.jpg";
import thailandImg from "../assets/images/thailand.jpg";
import dubaiImg from "../assets/images/dubai.jpg";
import delhiImg from "../assets/images/india.jpg";
import switImg from "../assets/images/swit.jpg"
import australiaImg from "../assets/images/australia.jpg"
import spainImg from "../assets/images/spain.jpg"
import brazilImg from "../assets/images/brazil.jpg"
import usaImg from "../assets/images/usa.jpg"
// Mapping of city names to imported images
const imageMap = {
  Paris: parisImg,
  Tokyo: japanImg, Kyoto: japanImg , Osaka: japanImg,
  London: londonImg,
  Rome: italyImg, Florence: italyImg, Venice: italyImg,
  Bali: thailandImg,Bangkok:thailandImg, Phuket:thailandImg, "Chiang Mai" :thailandImg,
  Dubai: dubaiImg,
  Delhi: delhiImg,
  Zurich: switImg, Lucerne: switImg, Interlaken: switImg,
  Sydney: australiaImg,Melbourne: australiaImg, Cairns: australiaImg,
  Barcelona: spainImg,Madrid: spainImg, Seville: spainImg,
  "Rio de Janeiro": brazilImg, "São Paulo": brazilImg, Salvador: brazilImg,
  "New York": usaImg , "Los Angeles": usaImg , "San Francisco": usaImg
  // Add more as needed
};

export default function ItineraryCard({ itinerary, onClick }) {
  const city = itinerary.cities?.[0]?.trim();
  const imageSrc = imageMap[city] || defaultImg;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-xl p-4 border flex flex-col sm:flex-row items-center gap-4"
    >
      <img
        src={imageSrc}
        alt={itinerary.cities?.join(", ")}
        className="w-full sm:w-64 h-40 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-indigo-700">
          {itinerary.country}
        </h3>
        <p className="text-black-600 text-sm mb-2">
          {itinerary.cities?.join(", ")}
        </p>
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
