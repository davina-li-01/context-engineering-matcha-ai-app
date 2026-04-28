import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icon paths broken by bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

const recommendedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function fallbackCenter(cafes, userCoords) {
  if (userCoords) return [userCoords.lat, userCoords.lng];
  if (cafes[0]) return [cafes[0].latitude, cafes[0].longitude];
  return [40.7128, -74.006];
}

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center[0], center[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function MapView({ cafes, recommendations, userCoords }) {
  const recommendedIds = new Set(recommendations.map((item) => item.id));
  const center = fallbackCenter(cafes, userCoords);

  return (
    <section className="card">
      <h2>Map View 🗺️</h2>
      <p className="hint" style={{ marginTop: 0 }}>
        Powered by OpenStreetMap — no API key required. &nbsp;
        <span style={{ color: "#16a34a" }}>●</span> Recommended &nbsp;
        <span style={{ color: "#6b7280" }}>●</span> All cafes &nbsp;
        {userCoords && (
          <>
            <span style={{ color: "#3b82f6" }}>●</span> You
          </>
        )}
      </p>
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100%", height: "400px", borderRadius: "10px" }}
        scrollWheelZoom={true}
      >
        <RecenterMap center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cafes.map((cafe) => {
          const isRecommended = recommendedIds.has(cafe.id);
          return (
            <Marker
              key={cafe.id}
              position={[cafe.latitude, cafe.longitude]}
              icon={isRecommended ? recommendedIcon : new L.Icon.Default()}
            >
              <Popup>
                <strong>{cafe.name}</strong>
                <br />
                {cafe.location}
                <br />⭐ {cafe.rating.toFixed(1)}
                {isRecommended && (
                  <>
                    <br />
                    <span style={{ color: "#16a34a" }}>✅ Recommended for you</span>
                  </>
                )}
              </Popup>
            </Marker>
          );
        })}
        {userCoords && (
          <Marker position={[userCoords.lat, userCoords.lng]} icon={userIcon}>
            <Popup>📍 You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
}

export default MapView;
