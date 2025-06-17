import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function AuthModal({ onClose, onSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState("select");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Cleanup when modal closes
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
    };
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            setMessage("reCAPTCHA expired, please try again.");
          },
        },
        auth // ✅ This is the fix: pass auth as 3rd argument
      );
    }
  };

  const handleSendPhoneOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      setMessage("Please enter a valid 10-digit phone number");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = "+91" + phone;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setStep("otp");
      setMessage("OTP sent! Please check your phone.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to send OTP: " + err.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setMessage("Please enter a 6-digit OTP");
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      setMessage("Phone number verified! Logging you in...");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessage("Google login successful!");
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setMessage("Google login failed: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[400px] p-6 relative shadow-lg">
        <button
          className="absolute top-3 right-3 text-red-500 font-bold text-xl"
          onClick={() => {
            if (window.recaptchaVerifier) {
              window.recaptchaVerifier.clear();
              delete window.recaptchaVerifier;
            }
            onClose?.();
          }}
        >
          ×
        </button>

        <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">
          Login to Continue
        </h2>

        {step === "select" && (
          <div className="space-y-4">
            <label className="block text-gray-700 font-semibold">
              Phone Number (India)
              <div className="flex items-center mt-1">
                <span className="inline-block px-3 py-2 bg-gray-200 rounded-l border border-r-0 border-gray-300 text-gray-800 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  className="input rounded-l-none flex-grow"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                    setMessage("");
                  }}
                />
              </div>
            </label>

            <button className="btn w-full" onClick={handleSendPhoneOtp}>
              Send OTP
            </button>

            <div className="text-center text-sm text-gray-400">OR</div>

            <button
              className="btn w-full bg-white border text-black hover:bg-gray-100"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 inline mr-2"
              />
              Continue with Google
            </button>

            <div id="recaptcha" className="mt-2" />
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="input"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
            <button className="btn w-full" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </div>
        )}

        {message && (
          <p
            className={`mt-3 text-center ${
              message.startsWith("Failed") ||
              message.startsWith("Invalid") ||
              message.includes("expired")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
