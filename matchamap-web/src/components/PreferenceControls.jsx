function PreferenceControls({ focusMode, onChange, preferences }) {
  return (
    <section className="card">
      <h2>Recommendation Parameters</h2>
      <p>
        Current taste profile: sweetness <strong>{preferences.sweetnessLevel}</strong>, strength{" "}
        <strong>{preferences.matchaStrength}</strong>, milk <strong>{preferences.milkPreference}</strong>,
        temperature <strong>{preferences.temperaturePreference}</strong>.
      </p>
      <label>
        Ranking focus
        <select value={focusMode} onChange={(event) => onChange(event.target.value)}>
          <option value="taste">Taste-first</option>
          <option value="balanced">Balanced</option>
          <option value="distance">Distance-aware (taste still prioritized)</option>
        </select>
      </label>
    </section>
  );
}

export default PreferenceControls;
