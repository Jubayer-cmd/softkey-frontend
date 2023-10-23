import Link from 'next/link';
import CarouselPage from './carousel';
import Footer from './footer';
import Navbar from './navbar';
import SectionPage from './section';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <CarouselPage />
      <Link href="/profile">Dashboard</Link>
      <h1 className="text-5xl mt-10">wowww</h1>
      <SectionPage />
      <Footer />
    </div>
  );
}
