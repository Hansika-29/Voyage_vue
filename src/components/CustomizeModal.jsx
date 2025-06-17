
import React, { useState } from "react";

const countryOptions = ["Italy", "Japan", "France", "India"];
const cityOptions = {
  Italy: ["Rome", "Venice", "Florence"],
  Japan: ["Tokyo", "Kyoto", "Osaka"],
  France: ["Paris", "Nice", "Lyon"],
  India: ["Delhi", "Mumbai", "Jaipur"],
};
const tripTypes = ["Family", "Solo", "Beaches", "Adventure", "Cultural", "Romantic"];
const dayOptions = ["<3 Days", "3-5 Days", "5-7 Days", "7-10 Days"];

export default function CustomizeModal({ onClose, onGenerate }) {
  const [step, setStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedDays, setSelectedDays] = useState("");

  const next = () => setStep((prev) => Math.min(prev + 1, 4));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleCityToggle = (city) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleTypeToggle = (type) => {
    setSelectedType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = () => {
    onGenerate({
      country: selectedCountry,
      cities: selectedCities,
      type: selectedType,
      days: selectedDays,
    });
  };

  const isNextDisabled = () => {
    if (step === 0) return !selectedCountry;
    if (step === 1) return selectedCities.length === 0;
    if (step === 2) return selectedType.length === 0;
    if (step === 3) return !selectedDays;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-xl w-full shadow-lg relative overflow-hidden">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Container with fixed height */}
        <div className="w-full h-[260px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out w-[500%]"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {/* STEP 0 - Country */}
            <div className="min-w-full p-4">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">1️⃣ Select a Country</h2>
              <input
                type="text"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                placeholder="Start typing..."
                className="border p-2 w-full rounded mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {countryOptions
                  .filter((c) => c.toLowerCase().includes(selectedCountry.toLowerCase()))
                  .map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCountry(c)}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        selectedCountry === c
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
              </div>
            </div>

            {/* STEP 1 - Cities */}
            <div className="min-w-full p-4">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">2️⃣ Select Cities</h2>
              <div className="flex flex-wrap gap-2">
                {(cityOptions[selectedCountry] || []).map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityToggle(city)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedCities.includes(city)
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-indigo-700"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2 - Trip Type */}
            <div className="min-w-full p-4">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">3️⃣ Type of Trip</h2>
              <div className="flex flex-wrap gap-2">
                {tripTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeToggle(type)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedType.includes(type)
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-indigo-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3 - Days */}
            <div className="min-w-full p-4">
              <h2 className="text-lg font-bold text-indigo-700 mb-2">4️⃣ Number of Days</h2>
              <div className="flex flex-wrap gap-2">
                {dayOptions.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedDays(range)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedDays === range
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-indigo-700"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 4 - Final Confirmation */}
            <div className="min-w-full p-4 ">
  <h2 className="text-lg font-bold text-indigo-700 mb-2">🎉 Ready to Generate</h2>
  <p className="text-sm text-gray-600 mb-4">
    Click below to draft your day-by-day personalized itinerary.
  </p>
  <button
    onClick={handleGenerate}
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
  >
    ✅ Draft Your Itinerary
  </button>
</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {step > 0 ? (
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700"
              onClick={prev}
            >
              ⬅️ Back
            </button>
          ) : (
            <div />
          )}
          {step < 4 ? (
            <button
              className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
              onClick={next}
              disabled={isNextDisabled()}
            >
              Next ➡️
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
