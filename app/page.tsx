'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Navbar from './components/Navbar';

const Map = dynamic(() => import('./ProviderMap'), { ssr: false });

const ALL_PROVIDERS = [
  { id: 1, name: "Dr. Elena Rodriguez", specialty: "Pain Management", zip: "90001", address: "100 Broadway, Los Angeles, CA", bio: "Focuses on chronic pain management using non-invasive techniques.", education: "UCSF", position: [34.0522, -118.2437] as [number, number] },
  { id: 2, name: "Dr. Marcus Chen", specialty: "Chiropractic", zip: "90210", address: "200 Santa Monica Blvd, Beverly Hills, CA", bio: "Trauma-informed chiropractic adjustments.", education: "Parker University", position: [34.0736, -118.4004] as [number, number] },
  { id: 3, name: "Dr. Sarah Jenkins", specialty: "Physical Therapy", zip: "94102", address: "300 Market St, San Francisco, CA", bio: "Rehabilitation for post-surgical injury cases.", education: "USC", position: [37.7749, -122.4194] as [number, number] },
  { id: 4, name: "Dr. David Kim", specialty: "Neurosurgery", zip: "92101", address: "400 Fifth Ave, San Diego, CA", bio: "Complex spinal and brain injury specialist.", education: "Stanford", position: [32.7157, -117.1611] as [number, number] },
  { id: 5, name: "Dr. Amanda Lee", specialty: "Imaging", zip: "95814", address: "500 Capitol Mall, Sacramento, CA", bio: "Advanced MRI and CT diagnostic reporting.", education: "UC Davis", position: [38.5816, -121.4944] as [number, number] },
  { id: 6, name: "Dr. Robert Wilson", specialty: "Pain Management", zip: "90012", address: "600 N Main St, Los Angeles, CA", bio: "Epidural injections and trigger point relief.", education: "UCLA", position: [34.0549, -118.2396] as [number, number] },
  { id: 7, name: "Dr. Jessica Martinez", specialty: "Chiropractic", zip: "94607", address: "700 Broadway, Oakland, CA", bio: "Specializes in whiplash recovery.", education: "Life West", position: [37.8044, -122.2712] as [number, number] },
  { id: 8, name: "Dr. Brian O'Connor", specialty: "Physical Therapy", zip: "92626", address: "800 Bristol St, Costa Mesa, CA", bio: "Hand and wrist mobility expert.", education: "Chapman", position: [33.6846, -117.8965] as [number, number] },
  { id: 9, name: "Dr. Emily Tran", specialty: "Neurosurgery", zip: "95113", address: "900 Almaden Blvd, San Jose, CA", bio: "Minimally invasive spinal decompression.", education: "Harvard", position: [37.3382, -121.8863] as [number, number] },
  { id: 10, name: "Dr. Thomas Wright", specialty: "Imaging", zip: "93721", address: "1000 Van Ness, Fresno, CA", bio: "Radiology for accident litigation support.", education: "UCSF", position: [36.7378, -119.7871] as [number, number] },
  { id: 11, name: "Dr. Karen White", specialty: "Pain Management", zip: "92801", address: "1100 Harbor Blvd, Anaheim, CA", bio: "Interventional pain management specialist.", education: "UCI", position: [33.8366, -117.9143] as [number, number] },
  { id: 12, name: "Dr. Kevin Scott", specialty: "Chiropractic", zip: "95501", address: "1200 E St, Eureka, CA", bio: "Spinal alignment post-MVA.", education: "Palmer", position: [40.8021, -124.1637] as [number, number] },
  { id: 13, name: "Dr. Sophia Garcia", specialty: "Physical Therapy", zip: "93101", address: "1300 State St, Santa Barbara, CA", bio: "Sports injury and accident rehab.", education: "CSUN", position: [34.4208, -119.6982] as [number, number] },
  { id: 14, name: "Dr. James Huang", specialty: "Neurosurgery", zip: "94501", address: "1400 Webster St, Alameda, CA", bio: "Neuro-trauma specialized surgery.", education: "Johns Hopkins", position: [37.7663, -122.2445] as [number, number] },
  { id: 15, name: "Dr. Lisa Peterson", specialty: "Imaging", zip: "92108", address: "1500 Hotel Circle, San Diego, CA", bio: "Diagnostic ultrasound and radiography.", education: "SDSU", position: [32.7673, -117.1527] as [number, number] },
  { id: 16, name: "Dr. Michael Reed", specialty: "Pain Management", zip: "90067", address: "1600 Century Park, Los Angeles, CA", bio: "Chronic neck and back pain specialist.", education: "USC", position: [34.0596, -118.4187] as [number, number] },
  { id: 17, name: "Dr. Olivia Bennett", specialty: "Chiropractic", zip: "94801", address: "1700 Macdonald Ave, Richmond, CA", bio: "Corrective exercise and alignment.", education: "Life West", position: [37.9358, -122.3477] as [number, number] },
  { id: 18, name: "Dr. Daniel Castro", specialty: "Physical Therapy", zip: "95202", address: "1800 Main St, Stockton, CA", bio: "Post-accident mobility therapy.", education: "UOP", position: [37.9577, -121.2908] as [number, number] },
  { id: 19, name: "Dr. Rachel Green", specialty: "Neurosurgery", zip: "93401", address: "1900 Chorro St, San Luis Obispo, CA", bio: "Peripheral nerve assessment.", education: "UCLA", position: [35.2828, -120.6596] as [number, number] },
  { id: 20, name: "Dr. Paul Simon", specialty: "Imaging", zip: "94043", address: "2000 Charleston Rd, Mountain View, CA", bio: "Advanced imaging diagnostics.", education: "Stanford", position: [37.4093, -122.0620] as [number, number] }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([36.7783, -119.4179]);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    const found = ALL_PROVIDERS.find(p => p.zip === val);
    if (found) setMapCenter(found.position);
    else if (val.startsWith("90")) setMapCenter([34.0522, -118.2437]);
    else if (val.startsWith("94")) setMapCenter([37.7749, -122.4194]);
  };

  const filteredProviders = [...ALL_PROVIDERS]
  .filter(p => {
    const matchesSearch = searchQuery === '' || p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || p.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  })
  .sort((a, b) => {
    const found = ALL_PROVIDERS.find(p => p.zip === searchQuery);
    if (!found) return 0;
    const distA = getDistance(found.position[0], found.position[1], a.position[0], a.position[1]);
    const distB = getDistance(found.position[0], found.position[1], b.position[0], b.position[1]);
    return distA - distB;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-2">
            <input type="text" placeholder="Zip or City..." className="border p-2 rounded w-full" onChange={(e) => handleSearch(e.target.value)} />
            <select className="border p-2 rounded" onChange={(e) => setSpecialtyFilter(e.target.value)}>
              <option value="All">All Specialties</option>
              <option value="Pain Management">Pain Management</option>
              <option value="Chiropractic">Chiropractic</option>
              <option value="Physical Therapy">Physical Therapy</option>
              <option value="Neurosurgery">Neurosurgery</option>
              <option value="Imaging">Imaging</option>
            </select>
          </div>
          {filteredProviders.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-xl border-2 border-[#90E0EF]">
              <h3 className="text-xl font-bold text-[#03045E]">{p.name}</h3>
              <p className="text-sm font-semibold text-[#0077B6]">{p.specialty} • {p.zip}</p>
              <button onClick={() => setExpandedId(expandedId === p.id ? null : p.id)} className="text-[#0077B6] font-bold mt-2 hover:underline">
                {expandedId === p.id ? 'Hide Details' : 'View Profile'}
              </button>
              {expandedId === p.id && <div className="mt-2 text-sm italic text-gray-600">{p.bio}</div>}
            </div>
          ))}
        </section>
        <section className="sticky top-6 h-[600px] border-2 border-[#00B4D8] rounded-2xl overflow-hidden hidden lg:block shadow-xl">
          <Map providers={filteredProviders} center={mapCenter} />
        </section>
      </div>
    </main>
  );
}
