import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * MycoVision — Educational + documentation support only.
 * Do not store PHI. Use synthetic examples only.
 */

function getPublicEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "" || v === "__FILL_ME__") {
    throw new Error(
      `Missing required env var ${name}. Fill it in .env.local (public Firebase config only).`
    );
  }
  return v;
}

const firebaseConfig = {
  apiKey: getPublicEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: getPublicEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: getPublicEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: getPublicEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getPublicEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getPublicEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || undefined,
};

export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export const firebaseApp = getFirebaseApp();
export const firebaseAuth = getAuth(firebaseApp);
export const firestoreDb = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
