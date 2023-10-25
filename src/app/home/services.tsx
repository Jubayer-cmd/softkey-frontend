'use client';
import { useAllServicesQuery } from '@/redux/api/adminApi/serviceApi';

export default function ServiceList() {
  const { data } = useAllServicesQuery({});
  console.log(data);
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1>Our Service</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((item, index) => (
            <div
              key={index}
              className="group relative block w-full transform transition-transform hover:translate-y-[-5px] hover:bg-white"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative flex flex-col justify-end h-72 sm:h-80 lg:h-96 p-4 sm:p-6 lg:p-8 bg-opacity-90 bg-black hover:bg-opacity-0 transition-all">
                <h2 className="text-xl font-medium sm:text-2xl text-white">
                  {item.name}
                </h2>
                <p className="text-sm sm:text-base text-white mt-2">
                  {item.description}
                </p>
                <p className="mt-4 font-bold text-white">Read more</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
