import {
    signOut,
    signInWithPhoneNumber,
    RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

/* LOGOUT */
export const logoutUser = async () => {
    await signOut(auth);
};

/* SETUP RECAPTCHA */
export const setupRecaptcha = (containerId) => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,                 // ✅ FIRST PARAM = auth
            containerId,          // ✅ SECOND PARAM = container ID
            {
                size: "invisible",
                callback: () => {
                    console.log("Recaptcha verified");
                },
                "expired-callback": () => {
                    console.log("Recaptcha expired");
                },
            }
        );
    }
};

/* SEND OTP */
export const sendOTP = async (phoneNumber) => {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
    );
    return confirmationResult;
};

/* VERIFY OTP */
export const verifyOTP = async (confirmationResult, otp) => {
    const result = await confirmationResult.confirm(otp);
    return result.user;
};
