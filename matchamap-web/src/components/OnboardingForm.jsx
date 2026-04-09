import { useState } from "react";

function OnboardingForm({ onSave }) {
  const [sweetnessLevel, setSweetnessLevel] = useState(3);
  const [matchaStrength, setMatchaStrength] = useState(3);
  const [milkPreference, setMilkPreference] = useState("oat");
  const [temperaturePreference, setTemperaturePreference] = useState("iced");
  const [likedCafes, setLikedCafes] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      sweetnessLevel: Number(sweetnessLevel),
      matchaStrength: Number(matchaStrength),
      milkPreference,
      temperaturePreference,
      likedCafes: likedCafes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    });
  }

  return (
    <section className="card">
      <h2>Matcha Preference Onboarding</h2>
      <p>Required to unlock personalized recommendations.</p>

      <form onSubmit={handleSubmit} className="stack">
        <label>
          Sweetness (1 = unsweetened, 5 = sweet)
          <input
            type="range"
            min="1"
            max="5"
            value={sweetnessLevel}
            onChange={(event) => setSweetnessLevel(event.target.value)}
          />
          <span>{sweetnessLevel}</span>
        </label>

        <label>
          Matcha strength (1 = light, 5 = bold)
          <input
            type="range"
            min="1"
            max="5"
            value={matchaStrength}
            onChange={(event) => setMatchaStrength(event.target.value)}
          />
          <span>{matchaStrength}</span>
        </label>

        <label>
          Milk preference
          <select
            value={milkPreference}
            onChange={(event) => setMilkPreference(event.target.value)}
          >
            <option value="oat">Oat milk</option>
            <option value="almond">Almond milk</option>
            <option value="whole">Whole milk</option>
            <option value="none">No milk</option>
          </select>
        </label>

        <label>
          Temperature preference
          <select
            value={temperaturePreference}
            onChange={(event) => setTemperaturePreference(event.target.value)}
          >
            <option value="iced">Iced</option>
            <option value="hot">Hot</option>
          </select>
        </label>

        <label>
          Cafes you already like (comma-separated)
          <textarea
            value={likedCafes}
            onChange={(event) => setLikedCafes(event.target.value)}
            rows={3}
            placeholder="Kyoto Garden Cafe, Uji Social"
          />
        </label>

        <button type="submit">Save preferences</button>
      </form>
    </section>
  );
}

export default OnboardingForm;
