import CarouselPage from './carousel';
import Footer from './footer';
import Navbar from './navbar';
import ProductsList from './products';
import SectionPage from './section';
import ServiceList from './services';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <CarouselPage />
      <ProductsList />
      <ServiceList  />
      <SectionPage />
      <Footer />
    </div>
  );
}
