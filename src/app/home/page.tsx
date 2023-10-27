import CarouselPage from './carousel';
import Footer from './footer';
import Navbar from './navbar';
import ProductsList from './products';
import SectionPage from './section';
import ServiceList from './services';
import Testmonial from './testmonial';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Navbar />
      <CarouselPage />
      <ProductsList />
      <ServiceList />
      <SectionPage />
      <Testmonial />
      <Footer />
    </div>
  );
}
