import React, { useState } from "react";
import FilterBar from "../components/FilterBar";
import ItineraryCard from "../components/ItineraryCard";
import CustomizeModal from "../components/CustomizeModal";
import GeneratedItinerary from "../components/GeneratedItinerary";
import dummyItineraries from "../data/itineraries";

export default function HomePage() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [activeItinerary, setActiveItinerary] = useState(null); // NEW

  const filteredItineraries = dummyItineraries.filter((itinerary) => {
    const matchCountry =
      selectedCountries.length === 0 || selectedCountries.includes(itinerary.country);
    const matchCity =
      selectedCities.length === 0 || itinerary.cities.some((city) => selectedCities.includes(city));
    return matchCountry && matchCity;
  });

  return (
    <div className="min-h-screen bg-white pb-16">
      <section className="text-center py-12 bg-indigo-50 rounded-b-3xl shadow-sm">
        <h1 className="text-5xl font-extrabold text-indigo-700">🌍 VoyageVue</h1>
        <p className="text-xl text-gray-700 mt-2">Plan. Explore. Live Your Journey.</p>
        <p className="text-sm text-gray-500 mt-1">Discover and filter curated itineraries.</p>
        <div className="mt-6">
          <button
            className="btn bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setShowCustomizeModal(true)}
          >
            ✨ Customize Your Own Plan
          </button>
        </div>
      </section>

      <div className="px-4 mt-10">
        <FilterBar
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
      </div>

      <div className="mt-6 px-4 max-w-6xl mx-auto space-y-4">
        {filteredItineraries.length > 0 ? (
          filteredItineraries.map((plan) => (
            <ItineraryCard
              key={plan.id}
              itinerary={plan}
              onClick={() => setActiveItinerary(plan)} // Pass click handler
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No itineraries found.</p>
        )}
      </div>

      {showCustomizeModal && (
        <CustomizeModal
          onClose={() => setShowCustomizeModal(false)}
          onGenerate={(data) => {
            setGeneratedData(data);
            setShowCustomizeModal(false);
          }}
        />
      )}

      {generatedData && (
        <GeneratedItinerary
          data={generatedData}
          onClose={() => setGeneratedData(null)}
        />
      )}

      {activeItinerary && (
        <GeneratedItinerary
          data={activeItinerary}
          onClose={() => setActiveItinerary(null)}
        />
      )}
    </div>
  );
}
