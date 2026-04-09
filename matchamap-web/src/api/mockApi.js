import { mockCafes } from "../data/mockCafes";
import { buildRecommendations } from "../lib/recommender";
import {
  getReviewsStorage,
  getUserFavorites,
  getUserPreferences,
  saveReviewsStorage,
  saveUserFavorites,
  saveUserPreferences
} from "../lib/storage";

function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getCafes({ location = "", limit = 20 } = {}) {
  const filtered = mockCafes.filter(
    (cafe) =>
      cafe.has_matcha &&
      (!location || cafe.location.toLowerCase().includes(location.toLowerCase()))
  );

  return filtered.slice(0, limit);
}

export function getRecommendations({ userId, location, userCoords, focusMode, limit = 8 }) {
  const preferences = getUserPreferences(userId);
  if (!preferences) {
    throw new Error("Please complete your matcha preference profile to see recommendations.");
  }

  return buildRecommendations({
    preferences,
    userCoords,
    focusMode,
    location
  }).slice(0, limit);
}

export function savePreferences(userId, preferences) {
  saveUserPreferences(userId, preferences);
  return preferences;
}

export function getReviews() {
  return getReviewsStorage().sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
}

export function submitReview({ userId, cafeId, rating, flavorNotes, photoUrl }) {
  if (!userId) {
    throw new Error("You must log in to submit a review.");
  }

  const reviews = getReviewsStorage();
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  const reviewsInLast24Hours = reviews.filter(
    (review) => review.user_id === userId && now - Date.parse(review.created_at) < oneDay
  );

  if (reviewsInLast24Hours.length >= 10) {
    throw new Error("Review limit reached. Try again later.");
  }

  const nextReview = {
    id: createId("rev"),
    user_id: userId,
    cafe_id: cafeId,
    rating,
    flavor_notes: flavorNotes,
    photo_url: photoUrl || "",
    created_at: new Date().toISOString()
  };

  saveReviewsStorage([...reviews, nextReview]);
  return nextReview;
}

export function getFavorites(userId) {
  return getUserFavorites(userId);
}

export function saveFavorite({ userId, cafeId }) {
  const favorites = getUserFavorites(userId);
  const hasAlreadySaved = favorites.includes(cafeId);
  const next = hasAlreadySaved
    ? favorites.filter((id) => id !== cafeId)
    : [...favorites, cafeId];

  saveUserFavorites(userId, next);
  return next;
}
