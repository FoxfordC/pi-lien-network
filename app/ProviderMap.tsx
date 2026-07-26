'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

export default function ProviderMap({ providers, center }: { providers: any[], center: [number, number] }) {
  return (
    <MapContainer 
      key={`map-${center[0]}-${center[1]}`} 
      center={center} 
      zoom={6} 
      style={{ height: '100%', width: '100%', border: '4px solid #00B4D8' }}
    >
      <MapController center={center} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {providers.map((p) => (
        <Marker key={p.id} position={p.position} icon={icon}>
          <Popup>
            <b>{p.name}</b><br/>
            {p.specialty}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
