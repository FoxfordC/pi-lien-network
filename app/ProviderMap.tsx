'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

type Provider = { 
  id: number; 
  name: string; 
  specialty: string; 
  position: [number, number]; 
  address: string;
};

export default function ProviderMap({ providers }: { providers: Provider[] }) {
  return (
    <MapContainer 
      key="leaflet-map" 
      center={[39.8283, -98.5795]} 
      zoom={4} 
      style={{ height: '100%', width: '100%', border: '4px solid #00B4D8' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {providers.map((p) => (
        <Marker key={p.id} position={p.position} icon={icon}>
          <Popup className="custom-popup">
          <div style={{ color: '#03045E', fontWeight: 'bold' }}>{p.name}</div>
          <div style={{ color: '#0077B6' }}>{p.specialty}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
