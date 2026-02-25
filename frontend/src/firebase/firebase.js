import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAaqzFIueUFS5c85CMatbmgqYhCc6Gdwjw",
    authDomain: "vastraa-ecommerce.firebaseapp.com",
    projectId: "vastraa-ecommerce",
    storageBucket: "vastraa-ecommerce.firebasestorage.app",
    messagingSenderId: "125342859247",
    appId: "1:125342859247:web:e3ab59a70b65cf70af001a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
