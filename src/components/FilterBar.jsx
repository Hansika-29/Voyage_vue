import React from "react";

const countries = ["Italy", "Japan", "France", "Spain", "India"];
const cityMap = {
  Italy: ["Rome", "Venice", "Florence"],
  Japan: ["Tokyo", "Kyoto", "Osaka"],
  France: ["Paris", "Nice", "Lyon"],
  Spain: ["Barcelona", "Madrid", "Seville"],
  India: ["Delhi", "Mumbai", "Jaipur"],
};

export default function FilterBar({
  selectedCountries,
  setSelectedCountries,
  selectedCities,
  setSelectedCities,
}) {
  const toggleCountry = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
      const removedCities = cityMap[country] || [];
      setSelectedCities(selectedCities.filter((city) => !removedCities.includes(city)));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const toggleCity = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  return (
    <div className="bg-indigo-50 p-4 rounded-lg shadow space-y-4">
      <div>
        <h3 className="font-bold text-indigo-700 mb-2">Select Countries:</h3>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => toggleCountry(country)}
              className={`px-3 py-1 rounded-full text-sm border ${
                selectedCountries.includes(country)
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600"
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {selectedCountries.length > 0 && (
        <div>
          <h3 className="font-bold text-indigo-700 mb-2">Select Cities:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCountries.flatMap((country) =>
              cityMap[country].map((city) => (
                <button
                  key={city}
                  onClick={() => toggleCity(city)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    selectedCities.includes(city)
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-indigo-600"
                  }`}
                >
                  {city}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
