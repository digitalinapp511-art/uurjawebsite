import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

import { auth, db } from "../firebase/firebase";
import { sendOTP, verifyOTP, setupRecaptcha } from "../firebase/authService";
import { collection,doc, setDoc, query, where, getDocs } from "firebase/firestore";
import logoImage from "../assets/logo/logo.jpeg";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setupRecaptcha("recaptcha-container-register");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!otpSent) {
      setFormData({ ...formData, [name]: value });
    } else {
      if (name === "otp") {
        setFormData({ ...formData, otp: value });
      }
    }
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowOTP(!showOTP);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!otpSent) {
      // Step 1: Send OTP
      if (!formData.name || !formData.phone) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError("Phone number must be 10 digits");
        setLoading(false);
        return;
      }

      try {
        // Check if phone number already exists
        const q = query(collection(db, "users"), where("phone", "==", formData.phone));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setError("Phone number already registered");
          setLoading(false);
          return;
        }

        // Send OTP
        const result = await sendOTP(`+91${formData.phone}`);
        setConfirmationResult(result);
        setOtpSent(true);
        setError("OTP sent to your phone number");
      } catch (err) {
        setError("Failed to send OTP. Please try again.");
        console.error("Send OTP error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Verify OTP and create account
      if (!formData.otp) {
        setError("OTP is required");
        setLoading(false);
        return;
      }

      if (formData.otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        setLoading(false);
        return;
      }

      try {
        // Verify OTP
        const user = await verifyOTP(confirmationResult, formData.otp);

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          phone: formData.phone,
          role: "user",
          createdAt: new Date(),
        });

        // Save user data locally
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            name: formData.name,
            phone: formData.phone,
          })
        );

        const params = new URLSearchParams(window.location.search);
        const next = params.get("next");
        if (next) {
          navigate(decodeURIComponent(next));
        } else {
          navigate("/");
        }
      } catch (err) {
        setError("Invalid OTP. Please try again.");
        console.error("Verify OTP error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen py-10 flex items-center justify-center 
                   md:bg-gray-200 px-4">

      <div className="flex w-auto max-w-4xl bg-white rounded-xl
                    md:rounded-xl shadow-lg overflow-hidden">

        {/* LEFT: FORM */}
        <div className="w-full md:w-1/2 max-w-sm mx-auto md:max-w-none md:mx-0 
                         p-8 flex flex-col justify-center  
                        md:bg-transparent transition-colors duration-300">
          <div className="h-2 bg-[#ff9d00] rounded-t-xl"></div>
          <h2 className="font-heading text-3xl font-bold text-center mb-3 text-[#ff9d00]">
            Create Account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              value={formData.name}
              disabled={loading || otpSent}
              className="w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9d00] disabled:opacity-50"
            />

            {/* Phone Input */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (10 digits)"
              required
              maxLength="10"
              onChange={handleChange}
              value={formData.phone}
              disabled={loading || otpSent}
              className="w-full p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9d00] disabled:opacity-50"
            />

            {/* OTP Input (shown after OTP is sent) */}
            {otpSent && (
              <div className="relative">
                <input
                  type={showOTP ? "text" : "password"}
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  required
                  onChange={handleChange}
                  value={formData.otp}
                  disabled={loading}
                  maxLength="6"
                  className="w-full p-2 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9d00] disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  disabled={loading}
                >
                  {showOTP ? (
                    <FiEyeOff className="text-xl" />
                  ) : (
                    <FiEye className="text-xl" />
                  )}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-[#ff9d00] hover:bg-[#ff9d00] text
                          text-white p-2 rounded-lg transition
                          flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (otpSent ? "Verifying..." : "Sending OTP...") : (otpSent ? "Verify OTP" : "Send OTP")}
              {!loading && (
                <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <p className="text-center mt-2 text-sm">
            Already have an account?{" "}
            <Link to={`/login${location.search || ""}`} className="text-[#ff9d00] font-semibold underline hover:text-[#73154f]">
              Login
            </Link>
          </p>
          
          {/* Recaptcha container */}
          <div id="recaptcha-container-register"></div>
        </div>

        {/* RIGHT: IMAGE (HIDDEN ONLY ON MOBILE) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={logoImage}
            alt="UURJA Logo"
            className="h-full w-full object-fit"
          />
        </div>

      </div>
    </div>
  );
};

export default Register;