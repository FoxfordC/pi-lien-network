import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#03045E] p-4 text-white flex gap-6 font-bold shadow-md">
      <Link href="/" className="hover:text-[#90E0EF]">Find Doctors</Link>
      <Link href="/intro" className="hover:text-[#90E0EF]">Introduction</Link>
      <Link href="/resources" className="hover:text-[#90E0EF]">Legal Resources</Link>
    </nav>
  );
}
