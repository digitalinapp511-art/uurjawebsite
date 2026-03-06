import axios from "axios";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

/* ===================================
   SEND OTP (Login / Auto Register)
=================================== */
export const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required",
      });
    }

    // Normalize mobile (important)
    const formattedMobile = mobile.startsWith("91")
      ? mobile
      : `91${mobile}`;

    // Check if user exists
    let user = await User.findOne({ mobile: formattedMobile });

    // If not exists → create new user
    if (!user) {
      user = await User.create({ mobile: formattedMobile });
    }

    // Send OTP via MSG91
    await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        mobile: formattedMobile,
        template_id: process.env.MSG91_TEMPLATE_ID,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};



/* ===================================
   VERIFY OTP & LOGIN
=================================== */
export const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile and OTP required",
      });
    }

    const formattedMobile = mobile.startsWith("91")
      ? mobile
      : `91${mobile}`;

    const user = await User.findOne({ mobile: formattedMobile });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify OTP
    await axios.get(
      `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=${formattedMobile}`,
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }
};