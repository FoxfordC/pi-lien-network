'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('./ProviderMap'), { ssr: false });

const ALL_PROVIDERS = [
  { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiology", state: "NY", zip: "10001", address: "123 Main St, New York, NY", bio: "Experienced in handling LOP personal injury claims.", education: "JHU", position: [40.7128, -74.0060] as [number, number] },
  { id: 2, name: "Dr. James Jones", specialty: "Orthopedics", state: "NY", zip: "10002", address: "456 Oak Ave, New York, NY", bio: "Specialist in trauma-related orthopedics.", education: "UCLA", position: [40.7300, -73.9900] as [number, number] },
  { id: 3, name: "Dr. Emily Lee", specialty: "Cardiology", state: "CA", zip: "90001", address: "789 Pine St, Los Angeles, CA", bio: "Accepts LOPs for complex cardiology cases.", education: "Stanford", position: [34.0522, -118.2437] as [number, number] },
  { id: 4, name: "Dr. Robert Davis", specialty: "Neurology", state: "CA", zip: "90002", address: "321 Elm St, Los Angeles, CA", bio: "Board-certified for brain injury assessments.", education: "Harvard", position: [34.0700, -118.2500] as [number, number] }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [funderOption, setFunderOption] = useState('No Funder');

  const filteredProviders = ALL_PROVIDERS.filter(p => {
    const matchesSearch = searchQuery === '' || p.address.toLowerCase().includes(searchQuery.toLowerCase()) || p.zip.includes(searchQuery);
    const matchesSpecialty = specialtyFilter === 'All' || p.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-[#03045E] p-6 text-white flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold">PI Lien Network</h1>
        <button onClick={() => setIsRegistering(true)} className="bg-[#90E0EF] text-[#03045E] px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-white shadow-lg ring-2 ring-[#00B4D8]">
          Register Practice
        </button>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-2">
            <input type="text" placeholder="Zip or City..." className="border p-2 rounded w-full" onChange={(e) => setSearchQuery(e.target.value)} />
            <select className="border p-2 rounded" onChange={(e) => setSpecialtyFilter(e.target.value)}>
              <option value="All">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
            </select>
          </div>

          {filteredProviders.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-xl border-2 border-[#90E0EF] hover:border-[#0077B6] transition-colors">
              <h3 className="text-xl font-bold text-[#03045E]">{p.name}</h3>
              <p className="text-sm font-semibold text-[#0077B6]">{p.specialty} • {p.zip}</p>
              <button onClick={() => setExpandedId(expandedId === p.id ? null : p.id)} className="text-[#0077B6] font-bold mt-2 cursor-pointer hover:underline">
                {expandedId === p.id ? 'Hide Details' : 'View Full Profile'}
              </button>
              {expandedId === p.id && <div className="mt-2 text-sm italic text-gray-600">Bio: {p.bio}</div>}
              <button onClick={() => setBookingId(p.id)} className="mt-4 w-full bg-[#0077B6] text-white py-2 rounded-lg font-bold cursor-pointer hover:bg-[#03045E]">Book Appointment</button>
            </div>
          ))}
        </section>
        
        <section className="sticky top-6 h-[600px] border-2 border-[#00B4D8] rounded-2xl overflow-hidden hidden lg:block shadow-xl">
          <Map providers={filteredProviders} center={[39.8283, -98.5795]} />
        </section>
      </div>

      {bookingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-[#03045E]">Book Appointment</h2>
            <div className="space-y-3">
              {['Client Name', 'DOB', 'Address', 'Date of Incident', 'Law Firm Name', 'Attorney Name', 'Case Manager Name', 'Injury Description', 'Incident Description'].map(f => (
                <input key={f} placeholder={f} className="w-full border-2 border-[#90E0EF] p-2 rounded focus:ring-2 focus:ring-[#0077B6] outline-none" />
              ))}
              <select onChange={(e) => setFunderOption(e.target.value)} className="w-full border-2 p-2 rounded">
                <option>No Funder</option><option>No Preferred Funder</option><option>Chosen Funder</option>
              </select>
              {funderOption === 'Chosen Funder' && <input placeholder="Enter Funder Name" className="w-full border-2 p-2 rounded" />}
              <button onClick={() => setBookingId(null)} className="w-full bg-[#0077B6] text-white py-2 rounded font-bold cursor-pointer">Submit</button>
              <button onClick={() => setBookingId(null)} className="w-full mt-2 text-gray-500 cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isRegistering && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4 text-[#03045E]">Practice Registration</h2>
            <div className="space-y-3">
              {['Full Name', 'Practice Name', 'Medical License #', 'Specialty', 'Office Address', 'Email', 'Phone'].map(f => (
                <input key={f} placeholder={f} className="w-full border-2 border-[#90E0EF] p-2 rounded focus:ring-2 focus:ring-[#0077B6] outline-none" />
              ))}
              <button onClick={() => setIsRegistering(false)} className="w-full bg-[#0077B6] text-white py-2 rounded font-bold cursor-pointer">Submit Application</button>
              <button onClick={() => setIsRegistering(false)} className="w-full mt-2 text-gray-500 cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
