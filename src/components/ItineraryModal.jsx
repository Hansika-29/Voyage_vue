import React from "react";

export default function ItineraryModal({ data, onClose, onRequireAuth }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[600px] p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-red-500 font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>

        {/* Title + Metadata */}
        <h2 className="text-2xl font-bold text-indigo-700">{data.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {data.country} — {data.days} Days
        </p>

        {/* Day-wise Itinerary */}
        <div className="mt-4 text-left space-y-2 text-gray-800">
          {data.itinerary?.map((activity, index) => (
            <p key={index}>
              <strong>Day {index + 1}:</strong> {activity}
            </p>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button
  className="btn bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 hover:border-indigo-700 hover:text-indigo-700"
  onClick={onRequireAuth}
>
  📋 Get Detailed Itinerary
</button>

<button
  className="btn bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 hover:border-indigo-700 hover:text-indigo-700"
  onClick={onRequireAuth}
>
  🏨 Check Places to Stay
</button>

<button
  className="btn bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 hover:border-indigo-700 hover:text-indigo-700"
  onClick={onRequireAuth}
>
  🎯 Explore Activities
</button>

        </div>
      </div>
    </div>
  );
}
