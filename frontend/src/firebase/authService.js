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
            auth,
            containerId,
            {
                size: "invisible",
                callback: (response) => { },
                "expired-callback": () => {
                    window.recaptchaVerifier = null; // reset on expiry
                },
            }
        );
        window.recaptchaVerifier.render(); // 👈 explicitly render it
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
