import { useEffect, useMemo, useState } from "react";
import AuthPanel from "./components/AuthPanel";
import CafeList from "./components/CafeList";
import MapView from "./components/MapView";
import OnboardingForm from "./components/OnboardingForm";
import PreferenceControls from "./components/PreferenceControls";
import ReviewPanel from "./components/ReviewPanel";
import {
  getCafes,
  getFavorites,
  getRecommendations,
  getReviews,
  saveFavorite,
  savePreferences,
  submitReview
} from "./api/mockApi";
import {
  getFocusMode,
  getSessionUser,
  getUserPreferences,
  logout,
  setFocusMode
} from "./lib/storage";

function App() {
  const [user, setUser] = useState(getSessionUser());
  const [cafes, setCafes] = useState([]);
  const [reviews, setReviews] = useState(getReviews());
  const [favorites, setFavorites] = useState(user ? getFavorites(user.id) : []);
  const [preferences, setPreferences] = useState(
    user ? getUserPreferences(user.id) : null
  );
  const [focusMode, setFocusModeState] = useState(
    user ? getFocusMode(user.id) : "taste"
  );
  const [locationFilter, setLocationFilter] = useState("");
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");

  const hasCompletedOnboarding = Boolean(preferences);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        setCoords(null);
      }
    );
  }, []);

  useEffect(() => {
    const nextCafes = getCafes({ location: locationFilter, limit: 50 });
    setCafes(nextCafes);
  }, [locationFilter]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setPreferences(null);
      setFocusModeState("taste");
      return;
    }

    setFavorites(getFavorites(user.id));
    setPreferences(getUserPreferences(user.id));
    setFocusModeState(getFocusMode(user.id));
  }, [user]);

  const recommendations = useMemo(() => {
    if (!user || !preferences) {
      return [];
    }

    try {
      return getRecommendations({
        userId: user.id,
        location: locationFilter,
        userCoords: coords,
        focusMode,
        limit: 8
      });
    } catch (err) {
      setError(err.message || "Could not load recommendations.");
      return [];
    }
  }, [user, preferences, locationFilter, coords, focusMode]);

  function handleAuthSuccess(nextUser) {
    setError("");
    setUser(nextUser);
  }

  function handleLogout() {
    logout();
    setUser(null);
  }

  function handleSavePreferences(nextPrefs) {
    if (!user) {
      return;
    }

    savePreferences(user.id, nextPrefs);
    setPreferences(nextPrefs);
  }

  function handleToggleFavorite(cafeId) {
    if (!user) {
      setError("Sign in to save favorites.");
      return;
    }

    const updatedFavorites = saveFavorite({ userId: user.id, cafeId });
    setFavorites(updatedFavorites);
  }

  function handleSubmitReview(payload) {
    if (!user) {
      setError("You must log in to submit a review.");
      return false;
    }

    try {
      const result = submitReview({ ...payload, userId: user.id });
      setReviews(getReviews());
      setError("");
      return Boolean(result?.id);
    } catch (err) {
      setError(err.message || "Failed to submit review.");
      return false;
    }
  }

  function handleFocusModeChange(nextMode) {
    setFocusModeState(nextMode);
    if (user) {
      setFocusMode(user.id, nextMode);
    }
  }

  return (
    <div className="page">
      <header className="app-header">
        <h1>🍵 MatchaMap</h1>
        <p>Discover high-quality matcha cafes with taste-first recommendations.</p>
      </header>

      <AuthPanel user={user} onAuthSuccess={handleAuthSuccess} onLogout={handleLogout} />

      {user && !hasCompletedOnboarding && (
        <OnboardingForm onSave={handleSavePreferences} />
      )}

      <section className="card">
        <h2>Discovery</h2>
        <div className="filter-row">
          <input
            value={locationFilter}
            onChange={(event) => setLocationFilter(event.target.value)}
            placeholder="Filter by city or area (e.g. Boston)"
          />
        </div>
      </section>

      {user && hasCompletedOnboarding && (
        <PreferenceControls
          focusMode={focusMode}
          onChange={handleFocusModeChange}
          preferences={preferences}
        />
      )}

      {error ? <p className="error">{error}</p> : null}

      <MapView cafes={cafes} recommendations={recommendations} userCoords={coords} />

      <CafeList
        cafes={cafes}
        recommendations={recommendations}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      <ReviewPanel
        cafes={cafes}
        reviews={reviews}
        canSubmit={Boolean(user)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}

export default App;
