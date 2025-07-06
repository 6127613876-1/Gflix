// src/lib/watchlist.js
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

// Add movie to watchlist
export const addToWatchlist = async (userId, movie) => {
  const ref = doc(db, "watchlists", userId);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    await updateDoc(ref, { movies: arrayUnion(movie) });
  } else {
    await setDoc(ref, { movies: [movie] });
  }
};

// Remove movie
export const removeFromWatchlist = async (userId, movie) => {
  const ref = doc(db, "watchlists", userId);
  await updateDoc(ref, { movies: arrayRemove(movie) });
};

// Get watchlist
export const getWatchlist = async (userId) => {
  const ref = doc(db, "watchlists", userId);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data().movies : [];
};
