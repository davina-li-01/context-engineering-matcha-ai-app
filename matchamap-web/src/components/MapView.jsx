import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "360px",
  borderRadius: "14px"
};

function fallbackCenter(cafes, userCoords) {
  if (userCoords) {
    return userCoords;
  }

  if (cafes[0]) {
    return { lat: cafes[0].latitude, lng: cafes[0].longitude };
  }

  return { lat: 42.3601, lng: -71.0589 };
}

function MapView({ cafes, recommendations, userCoords }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const recommendedIds = new Set(recommendations.map((item) => item.id));

  const { isLoaded } = useJsApiLoader({
    id: "matchamap-google-map",
    googleMapsApiKey: apiKey || ""
  });

  const center = fallbackCenter(cafes, userCoords);

  return (
    <section className="card">
      <h2>Map View</h2>
      {!apiKey ? (
        <p className="hint">
          Add <strong>VITE_GOOGLE_MAPS_API_KEY</strong> to enable interactive maps.
        </p>
      ) : null}

      {!apiKey || !isLoaded ? (
        <div className="map-fallback">
          {cafes.map((cafe) => (
            <p key={cafe.id}>
              {recommendedIds.has(cafe.id) ? "✅" : "•"} {cafe.name} ({cafe.latitude.toFixed(3)},{" "}
              {cafe.longitude.toFixed(3)})
            </p>
          ))}
        </div>
      ) : (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
          {cafes.map((cafe) => (
            <Marker
              key={cafe.id}
              position={{ lat: cafe.latitude, lng: cafe.longitude }}
              title={`${cafe.name}${recommendedIds.has(cafe.id) ? " (Recommended)" : ""}`}
            />
          ))}
          {userCoords ? (
            <Marker
              position={userCoords}
              title="You"
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#0f766e",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff"
              }}
            />
          ) : null}
        </GoogleMap>
      )}
    </section>
  );
}

export default MapView;
