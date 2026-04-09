import { useState } from "react";

function ReviewPanel({ cafes, reviews, canSubmit, onSubmit }) {
  const [cafeId, setCafeId] = useState(cafes[0]?.id || "");
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const ok = onSubmit({
      cafeId,
      rating: Number(rating),
      flavorNotes: notes
    });

    if (ok) {
      setNotes("");
      setRating(5);
    }
  }

  return (
    <section className="card">
      <h2>Reviews</h2>

      <form onSubmit={handleSubmit} className="stack">
        <label>
          Cafe
          <select
            value={cafeId}
            onChange={(event) => setCafeId(event.target.value)}
            disabled={!canSubmit}
          >
            {cafes.map((cafe) => (
              <option key={cafe.id} value={cafe.id}>
                {cafe.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Rating (1-5)
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            disabled={!canSubmit}
          />
        </label>

        <label>
          Flavor notes
          <textarea
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={!canSubmit}
          />
        </label>

        <button type="submit" disabled={!canSubmit || !cafeId}>
          Submit review
        </button>
      </form>

      {!canSubmit ? <p className="hint">Log in to submit a review.</p> : null}

      <div className="stack">
        {reviews.slice(0, 12).map((review) => {
          const cafe = cafes.find((item) => item.id === review.cafe_id);
          return (
            <article key={review.id} className="review-item">
              <p>
                <strong>{cafe?.name || "Cafe"}</strong> · {"⭐".repeat(review.rating)}
              </p>
              <p>{review.flavor_notes || "No tasting notes."}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ReviewPanel;
