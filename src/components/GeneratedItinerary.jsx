import React, { useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";

export default function GeneratedItinerary({ data, onClose }) {
  const itineraryRef = useRef();

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDownloadPDF = () => {
    const element = itineraryRef.current;
    const opt = {
      margin: 0.5,
      filename: `Itinerary_${data?.country || "Trip"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (
    !data ||
    !data.country ||
    !Array.isArray(data.cities) ||
    data.cities.length === 0 ||
    !data.days
  ) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
          <p className="text-red-500 text-lg font-semibold mb-4">
            ❌ Missing or invalid itinerary data.
          </p>
          <button
            className="px-4 py-2 rounded bg-gray-300 text-gray-700"
            onClick={onClose}
          >
            🔙 Back
          </button>
        </div>
      </div>
    );
  }

  const parseDays = (range) => {
    switch (range) {
      case "<3 Days":
        return 2;
      case "3-5 Days":
        return 4;
      case "5-7 Days":
        return 6;
      case "7-10 Days":
        return 8;
      default:
        return 3;
    }
  };

  const totalDays = parseDays(data.days);
  const { country, cities, type } = data;
  const typeList = Array.isArray(type) ? type : [type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full shadow-lg relative mt-8 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        {/* Content to convert to PDF */}
        <div ref={itineraryRef} className="space-y-6 p-6 text-gray-800 font-sans">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            📍 {country} — {typeList.join(", ")} Trip
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {cities.length} cities | {totalDays} day itinerary
          </p>

          {[...Array(totalDays)].map((_, day) => {
            const city = cities[day % cities.length];
            return (
              <div
                key={day}
                className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                  📅 Day {day + 1}: {city}
                </h3>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  <li>Visit top attractions and landmarks in {city}</li>
                  <li>
                    Enjoy {typeList.map((t) => t.toLowerCase()).join(", ")} experiences
                  </li>
                  <li>Try authentic cuisine and street food</li>
                  <li>Evening walk or cultural activity</li>
                </ul>
              </div>
            );
          })}

          <div>
            <h3 className="text-lg font-bold text-green-700 mt-6">
              🏨 Suggested Places to Stay
            </h3>
            <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
              <li>{cities[0] ?? "City Center"} Grand Residency</li>
              <li>{cities[1] ?? cities[0] ?? "Central"} Comfort Inn</li>
              <li>Traveler’s Nest</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-pink-700 mt-6">
              🍴 Restaurant Suggestions
            </h3>
            <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
              <li>The Local Bite</li>
              <li>Spices & Stories</li>
              <li>Heritage Café</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between px-6 pb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            🔙 Back
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            📥 Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
