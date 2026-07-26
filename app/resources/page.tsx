import Navbar from '../components/Navbar';

export default function Resources() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#03045E] mb-6">Medical Lien & LOP Resources</h1>
        
        <section className="bg-white p-8 rounded-xl shadow border border-gray-200 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-[#03045E]">What is a Letter of Protection?</h2>
          <p className="text-gray-700 mb-4">
            A Letter of Protection (LOP) is an agreement that allows personal injury victims to receive medical treatment on credit. The patient agrees to pay the doctor directly from the proceeds of their future settlement or verdict.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Immediate Access:</strong> No need to pay out-of-pocket for necessary diagnostic studies or surgery.</li>
            <li><strong>Legal Alignment:</strong> Ensures that medical billing is handled as part of the case settlement.</li>
            <li><strong>Documentation:</strong> Our network providers are trained to document injury severity, which is vital for maximizing case value.</li>
          </ul>
        </section>

        <footer className="text-gray-500 text-sm italic">
          Disclaimer: Our network does not provide legal or financial advice. Always consult with your attorney regarding the specifics of your LOP agreement.
        </footer>
      </div>
    </main>
  );
}
