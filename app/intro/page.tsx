import Navbar from '../components/Navbar';

export default function Intro() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 bg-white mt-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-[#03045E] mb-6 border-b pb-4">Your Network for Quality Care</h1>
        <p className="text-lg text-gray-700 mb-6">
          Managing a personal injury case requires more than just legal expertise; it requires a medical team that understands the complexities of Letter of Protection (LOP) claims. Our network connects attorneys and their clients with board-certified medical professionals who prioritize quality care and comprehensive documentation.
        </p>
        
        <h2 className="text-2xl font-bold text-[#0077B6] mb-4">Why Partner With Us?</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-bold text-[#03045E]">For Attorneys</h3>
            <p className="text-sm">Find specialists who understand the lien process, ensuring your clients get timely treatment and you get the precise medical reports needed for your case.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-bold text-[#03045E]">For Patients</h3>
            <p className="text-sm">Access top-tier medical care without the immediate financial burden. Our providers accept LOPs, allowing you to focus on your recovery first.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
