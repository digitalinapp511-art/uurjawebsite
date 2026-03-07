import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAw_K8IYlOQrd889V1q5VWY8Is1s3o5HJI",
    authDomain: "webbb-84a62.firebaseapp.com",
    projectId: "webbb-84a62",
    storageBucket: "webbb-84a62.firebasestorage.app",
    messagingSenderId: "710766159044",
    appId: "1:710766159044:web:2fadf0ddd2874a59d95591",
    measurementId: "G-C5HEY4NQNK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

