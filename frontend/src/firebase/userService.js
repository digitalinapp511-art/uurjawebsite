import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const saveUserToDB = async (user, additionalData = {}) => {
    await setDoc(doc(db, "users", user.uid), {
        name: additionalData.name || user.displayName || "",
        phone: additionalData.phone || "",
        role: "user",
        createdAt: new Date(),
    });
};
