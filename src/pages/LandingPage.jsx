import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import ItineraryModal from "../components/ItineraryModal";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Assuming you have this

export default function LandingPage({ onLogin }) {
  const [authMode, setAuthMode] = useState(null); // login only
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();

  // Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleCardClick = (cardData) => {
    if (cardData.triggerLogin) {
      setAuthMode("login");
    } else {
      setSelectedCard(cardData);
    }
  };

  // Called when login/signup success happens inside AuthModal
  const handleLoginSuccess = () => {
    setAuthMode(null);
    onLogin?.(); // optional callback passed from parent
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ HERO SECTION */}
      <section className="text-center py-16 bg-indigo-50 rounded-b-3xl shadow-sm">
        <h1 className="text-5xl font-extrabold text-indigo-700">🌍 VoyageVue</h1>
        <p className="text-xl text-gray-700 mt-3">Plan. Explore. Live Your Journey.</p>
        <p className="text-sm text-gray-500 mt-1">Custom itineraries designed just for you.</p>

        {/* CTA Login Button */}
        <div className="mt-6 flex justify-center">
          <button className="btn" onClick={() => setAuthMode("login")}>
            Login
          </button>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 px-6 max-w-6xl mx-auto text-left">
        <div className="p-4 bg-indigo-100 rounded-lg shadow">
          <h3 className="font-semibold text-indigo-700 mb-2">🧭 Curated Itineraries</h3>
          <p className="text-sm text-gray-700">
            Get expert-created travel plans for amazing global destinations.
          </p>
        </div>
        <div className="p-4 bg-indigo-100 rounded-lg shadow">
          <h3 className="font-semibold text-indigo-700 mb-2">🎯 Personalized Filters</h3>
          <p className="text-sm text-gray-700">
            Choose countries, vibes, and group types to generate custom trips.
          </p>
        </div>
        <div className="p-4 bg-indigo-100 rounded-lg shadow">
          <h3 className="font-semibold text-indigo-700 mb-2">📍 Explore & Stay</h3>
          <p className="text-sm text-gray-700">
            Find hidden gems, track stay options, and manage travel days.
          </p>
        </div>
      </section>

      {/* ✅ CAROUSEL SECTION */}
      <section className="mt-14 px-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">🔥 Popular Itineraries</h2>
        <Carousel onCardClick={handleCardClick} />
      </section>

      {/* ✅ CTA BELOW CAROUSEL */}
      <div className="mt-10 text-center">
        <button className="btn" onClick={() => setAuthMode("login")}>
          🔍 Explore More Itineraries
        </button>
      </div>

      {/* ✅ MODALS */}
      {selectedCard && (
        <ItineraryModal
          data={selectedCard}
          onClose={() => setSelectedCard(null)}
          onRequireAuth={() => setAuthMode("login")}
        />
      )}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)} // Required to close modal
          onSuccess={handleLoginSuccess}   // Redirect on login success
        />
      )}

      {/* ✅ FOOTER */}
      <footer className="mt-16 bg-indigo-950 text-white text-center py-8 rounded-t-3xl">
        <h2 className="text-xl font-bold">🌍 VoyageVue</h2>
        <p className="text-sm text-indigo-200 mt-1">Crafting journeys, one plan at a time.</p>

        <div className="mt-4 flex justify-center space-x-6 text-sm text-indigo-300">
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
        </div>

        <p className="mt-6 text-xs text-indigo-400">
          © {new Date().getFullYear()} VoyageVue. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
