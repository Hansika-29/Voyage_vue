import React, { useState, useEffect } from "react";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Ensure Recaptcha is only initialized once
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );
      window.recaptchaVerifier.render(); // ✅ Render it
    }
  }, []);

  const sendPhoneOtp = async () => {
    if (phone.length !== 10) return;

    try {
      setLoading(true);
      const fullPhone = "+91" + phone;
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmResult(result);
      alert("OTP sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneOtp = async () => {
    try {
      await confirmResult.confirm(otp);
      alert("OTP Verified!");
      navigate("/home");
    } catch (err) {
      alert("Incorrect OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Login</h2>

        <input
          type="tel"
          placeholder="Enter 10-digit phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          className="border p-2 w-full rounded"
        />

        {!confirmResult ? (
          <>
            <div id="recaptcha-container" /> {/* ✅ Correct ID here */}
            <button
              onClick={sendPhoneOtp}
              disabled={loading || phone.length !== 10}
              className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={verifyPhoneOtp}
              className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700"
            >
              Verify & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
