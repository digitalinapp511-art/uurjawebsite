import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

import { auth, db } from "../firebase/firebase";
import { sendOTP, verifyOTP, setupRecaptcha } from "../firebase/authService";
import { collection, query, where, getDocs } from "firebase/firestore";
import CloudinaryImage from "../components/CloudinaryImage";

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setupRecaptcha("recaptcha-container");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!otpSent) {
      setFormData({ ...formData, phone: value });
    } else {
      setFormData({ ...formData, otp: value });
    }
    setError("");
    setMessageType("error");
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
      if (!formData.phone) {
        setError("Phone number is required");
        setLoading(false);
        return;
      }

      // Validate phone number format (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError("Please enter a valid 10-digit phone number");
        setLoading(false);
        return;
      }

      try {
        // Check if user exists with this phone number
        const q = query(
          collection(db, "users"),
          where("phone", "==", formData.phone)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("User not found with this phone number");
          setLoading(false);
          return;
        }

        // Send OTP
        const result = await sendOTP(`+91${formData.phone}`);
        setConfirmationResult(result);
        setOtpSent(true);
        setError("OTP sent to your phone number");
        setMessageType("success");
      } catch (err) {
        setError("Failed to send OTP. Please try again.");
        console.error("Send OTP error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Verify OTP
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

        // Fetch user data from Firestore
        const q = query(
          collection(db, "users"),
          where("phone", "==", formData.phone)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs[0].data();

        // Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            name: userData?.name || "",
            phone: userData?.phone || formData.phone,
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
    <div className="h-screen py-16 flex items-center justify-center 
                   md:bg-gray-200 px-4">

      <div className="flex w-auto max-w-4xl bg-white rounded-xl
                    md:rounded-xl shadow-lg overflow-hidden">

        {/* LEFT: FORM */}
        <div className="w-full md:w-1/2 max-w-sm mx-auto md:max-w-none md:mx-0 
                         p-8 flex flex-col justify-center  
                        md:bg-transparent transition-colors duration-300">
          <div className="h-2 bg-[#ff9d00] rounded-t-xl"></div>
          <h2 className="font-heading text-3xl font-bold text-center mb-6 text-[#ff9d00]">
            UURJA
          </h2>

          {/* Error Message */}
          {error && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              messageType === 'success'
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone Number Input */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number (10 digits)"
              required
              onChange={handleChange}
              value={formData.phone}
              disabled={loading || otpSent}
              className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1c62] disabled:opacity-50"
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
                  className="w-full p-3 pr-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9d00] disabled:opacity-50"
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
              className="group w-full bg-[#ff9d00] hover:bg-[#ff9d00] text-white p-3 rounded-lg transition
                         flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (otpSent ? "Verifying..." : "Sending OTP...") : (otpSent ? "Verify OTP" : "Send OTP")}
              {!loading && (
                <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to={`/register${location.search || ""}`} className="text-[#ff9d00] font-semibold underline hover:text-[#73154f]">
              Register
            </Link>
          </p>
          
          {/* Recaptcha container */}
          <div id="recaptcha-container"></div>
        </div>

        {/* RIGHT: IMAGE (HIDDEN ONLY ON MOBILE) */}
        <div className="hidden md:block md:w-1/2">
          <CloudinaryImage
            src="https://res.cloudinary.com/dqkssrvir/image/upload/v1772029046/logo_hg37lr.jpg"
            alt="UURJA Image"
            width={600}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Login;