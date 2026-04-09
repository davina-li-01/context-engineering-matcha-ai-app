const KEYS = {
  users: "mm_users",
  sessionUser: "mm_session_user",
  reviews: "mm_reviews"
};

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function userScopedKey(type, userId) {
  return `mm_${type}_${userId}`;
}

export function getUsers() {
  return readJson(KEYS.users, []);
}

export function saveUsers(users) {
  writeJson(KEYS.users, users);
}

export function setSessionUser(user) {
  writeJson(KEYS.sessionUser, user);
}

export function getSessionUser() {
  return readJson(KEYS.sessionUser, null);
}

export function logout() {
  localStorage.removeItem(KEYS.sessionUser);
}

export function getUserPreferences(userId) {
  return readJson(userScopedKey("prefs", userId), null);
}

export function saveUserPreferences(userId, preferences) {
  writeJson(userScopedKey("prefs", userId), preferences);
}

export function getUserFavorites(userId) {
  return readJson(userScopedKey("favorites", userId), []);
}

export function saveUserFavorites(userId, favorites) {
  writeJson(userScopedKey("favorites", userId), favorites);
}

export function getReviewsStorage() {
  return readJson(KEYS.reviews, []);
}

export function saveReviewsStorage(reviews) {
  writeJson(KEYS.reviews, reviews);
}

export function getFocusMode(userId) {
  return readJson(userScopedKey("focus", userId), "taste");
}

export function setFocusMode(userId, mode) {
  writeJson(userScopedKey("focus", userId), mode);
}
