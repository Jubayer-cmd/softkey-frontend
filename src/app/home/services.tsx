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
            <div className="block" key={index}>
              <img
                alt= {item?.name}
                src={item?.image}
                className="h-48 w-full object-cover sm:h-80 lg:h-96"
              />

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                {item?.name}
              </h3>

              <p className="mt-2 max-w-sm text-gray-700">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
