import { Carousel } from 'antd';
import Image from 'next/image';

export default function CarouselPage() {
  return (
    <div className="carousel-container">
      <Carousel effect="fade" autoplay infinite className="carousel">
        <div className="carousel-item">
          <Image
            src="https://plus.unsplash.com/premium_photo-1688678097473-2ce11d23e30c?auto=format&fit=crop&q=80&w=1340&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={1000}
            height={400}
            alt="image"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={1000}
            height={400}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
        <div className="carousel-item">
          <Image
            src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD"
           width={1000}
            height={400}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
        <div className="carousel-item">
          <Image
            src="https://images.unsplash.com/photo-1614846027182-cecfee3a427b?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
           width={1000}
            height={400}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
      </Carousel>
    </div>
  );
}
