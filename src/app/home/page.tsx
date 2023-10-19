import Link from "next/link";
import Navbar from './navbar';


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Link href="/profile">Dashboard</Link>
      <h1 className="text-5xl mt-10">wowww</h1>
    </div>
  );
}
