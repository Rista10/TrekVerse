"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

// Dynamically import MapContainer to disable SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then(mod => mod.Popup),
  { ssr: false }
);

interface TrekMapProps {
  latitude?: number;
  longitude?: number;
}

export default function TrekMap({ latitude, longitude }: TrekMapProps) {
  const position: LatLngExpression = [latitude || 51.505, longitude || -0.09];

  return (
    <div className="w-full h-[80vh] rounded-2xl overflow-hidden shadow-lg">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={position}>
          <Popup>
            Location: {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
