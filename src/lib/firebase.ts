import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDyCncQrKOi7_y0OGN_1p-kEFeULWah7aQ",
  authDomain: "hotel-52f68.firebaseapp.com",
  projectId: "hotel-52f68",
  storageBucket: "hotel-52f68.firebasestorage.app",
  messagingSenderId: "207298586831",
  appId: "1:207298586831:web:c3b8bb564454f6e1c86fba",
  measurementId: "G-VKYEDWPCH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;