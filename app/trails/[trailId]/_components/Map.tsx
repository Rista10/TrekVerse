"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);
const Polyline = dynamic(
    () => import("react-leaflet").then((mod) => mod.Polyline),
    { ssr: false }
);

interface Checkpoint {
    name: string;
    latitude: number;
    longitude: number;
    description: string;
}

interface TrekMapProps {
    latitude?: number;
    longitude?: number;
    checkpoints?: Checkpoint[];
}

export default function TrekMap({ latitude, longitude, checkpoints }: TrekMapProps) {
    const position: LatLngExpression = [latitude || 51.505, longitude || -0.09];

    // Calculate bounds to fit all markers if checkpoints exist
    let mapCenter = position;
    let mapZoom = 13;

    if (checkpoints && checkpoints.length > 0) {
        const allPoints = [
            [latitude || 51.505, longitude || -0.09],
            ...checkpoints.map(cp => [cp.latitude, cp.longitude])
        ];
        const lats = allPoints.map(p => p[0]);
        const lngs = allPoints.map(p => p[1]);
        const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
        const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        mapCenter = [centerLat, centerLng];
        mapZoom = 11; // Zoom out to fit all markers
    }

    const defaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    });

    const createNumberedIcon = (number: number) =>
        L.divIcon({
            html: `<div style="background-color:#2b6cb0;color:white;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;border:2px solid white;">${number}</div>`,
            className: "",
            iconSize: [24, 24],
            iconAnchor: [12, 24],
        });

    // Pre-create markers array with unique keys based on checkpoint name
    const markers = checkpoints && checkpoints.length > 0
        ? checkpoints.map((cp, index) => (
            <Marker
                key={`checkpoint-${cp.name}-${index}`} // Unique key combining name and index
                position={[cp.latitude, cp.longitude]}
                icon={createNumberedIcon(index + 1)}
            >
                <Popup>
                    <strong>{cp.name}</strong>
                    <br />
                    {cp.description}
                </Popup>
            </Marker>
        ))
        : [];

    console.log("Checkpoints received:", checkpoints);
    console.log("Number of markers:", markers.length);

    // Build polyline coordinates connecting checkpoints in order
    const polylineCoordinates: LatLngExpression[] = checkpoints && checkpoints.length > 0
        ? checkpoints.map(cp => [cp.latitude, cp.longitude] as LatLngExpression)
        : [];

    return (
        <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow-lg">
            <MapContainer
                center={mapCenter as LatLngExpression}
                zoom={mapZoom}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Polyline connecting all checkpoints */}
                {polylineCoordinates.length > 1 && (
                    <Polyline
                        positions={polylineCoordinates}
                        color="#e74c3c"
                        weight={3}
                        opacity={0.8}
                    />
                )}

                {/* Main location marker
                <Marker position={position} icon={defaultIcon}>
                    <Popup>
                        Location: {latitude}, {longitude}
                    </Popup>
                </Marker> */}

                {markers}
            </MapContainer>
        </div>
    );
}
