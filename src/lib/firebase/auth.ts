import {
  GoogleAuthProvider,
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  signOut,
  type User,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "./client";

/**
 * MycoVision — Educational + documentation support only.
 * Do not store PHI. Use synthetic examples only.
 */

export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export async function initAuthPersistence(): Promise<void> {
  // Keep user signed in across refresh.
  await setPersistence(auth, browserLocalPersistence);
}

export async function signInWithGoogle(): Promise<User> {
  const res = await signInWithPopup(auth, googleProvider);
  return res.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
