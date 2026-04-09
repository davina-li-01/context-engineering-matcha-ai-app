import { mockCafes } from "../data/mockCafes";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distanceInKm(a, b) {
  if (!a || !b) {
    return null;
  }

  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

function scoreTaste(cafe, preferences) {
  const sweetnessDelta = Math.abs(cafe.profile.sweetness - preferences.sweetnessLevel);
  const strengthDelta = Math.abs(cafe.profile.strength - preferences.matchaStrength);

  const sweetnessScore = 1 - sweetnessDelta / 4;
  const strengthScore = 1 - strengthDelta / 4;

  const milkScore = cafe.profile.milk.includes(preferences.milkPreference) ? 1 : 0.35;
  const tempScore = cafe.profile.temperature.includes(preferences.temperaturePreference)
    ? 1
    : 0.4;

  return clamp(
    sweetnessScore * 0.3 + strengthScore * 0.4 + milkScore * 0.15 + tempScore * 0.15,
    0,
    1
  );
}

function scoreDistance(cafe, userCoords) {
  if (!userCoords) {
    return 0.5;
  }

  const distance = distanceInKm(userCoords, {
    lat: cafe.latitude,
    lng: cafe.longitude
  });

  if (distance === null) {
    return 0.5;
  }

  return clamp(1 - distance / 15, 0.05, 1);
}

function weightForFocusMode(focusMode) {
  if (focusMode === "distance") {
    return 0.55;
  }
  if (focusMode === "balanced") {
    return 0.7;
  }
  return 0.82;
}

export function buildRecommendations({ preferences, userCoords, focusMode, location }) {
  const tasteWeight = weightForFocusMode(focusMode);
  const filtered = mockCafes.filter(
    (cafe) =>
      cafe.has_matcha &&
      (!location || cafe.location.toLowerCase().includes(location.toLowerCase()))
  );

  return filtered
    .map((cafe) => {
      const tasteScore = scoreTaste(cafe, preferences);
      const distanceScore = scoreDistance(cafe, userCoords);
      const total = tasteScore * tasteWeight + distanceScore * (1 - tasteWeight);

      return {
        ...cafe,
        match_score: Number(total.toFixed(3)),
        taste_score: Number(tasteScore.toFixed(3)),
        distance_score: Number(distanceScore.toFixed(3))
      };
    })
    .sort((a, b) => b.match_score - a.match_score);
}
