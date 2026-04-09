function CafeList({ cafes, recommendations, favorites, onToggleFavorite }) {
  const recommendationById = new Map(recommendations.map((item) => [item.id, item]));

  return (
    <section className="card">
      <h2>Matcha Cafes</h2>
      {cafes.length === 0 ? <p>No cafes match this filter.</p> : null}
      <div className="grid">
        {cafes.map((cafe) => {
          const recommendation = recommendationById.get(cafe.id);
          const isFavorite = favorites.includes(cafe.id);

          return (
            <article className="cafe-card" key={cafe.id}>
              <div className="cafe-top-row">
                <h3>{cafe.name}</h3>
                <button
                  type="button"
                  className="chip"
                  onClick={() => onToggleFavorite(cafe.id)}
                >
                  {isFavorite ? "★ Favorited" : "☆ Save"}
                </button>
              </div>
              <p>{cafe.location}</p>
              <p>Average rating: {cafe.rating.toFixed(1)}</p>
              {recommendation ? (
                <p className="match-score">
                  Match score: <strong>{Math.round(recommendation.match_score * 100)}%</strong>
                </p>
              ) : (
                <p className="hint">Complete onboarding to see personalized match scores.</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CafeList;
