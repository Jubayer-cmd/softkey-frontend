'use client';
import Footer from '@/app/home/footer';
import { useProductIdQuery } from '@/redux/api/adminApi/productApi';
import { addToCart, updateQuantity } from '@/redux/api/cartApi/cartApi';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import NavbarPage from './../../home/navbar';
export default function ProductDetails({ params }: { params: { id: string } }) {
  const { data } = useProductIdQuery(params.id);
  console.log(data);
  const [images, setImages] = useState({
    img1: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
    img2: 'https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
    img3: 'https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
    img4: 'https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png',
  });

  const [activeImg, setActiveImage] = useState(data?.image);

  const [amount, setAmount] = useState(1);
  const dispatch = useAppDispatch();
  const handleUpdateQuantity = (itemId: any, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  };
  const handleAddToCart = (item: {
    id: any;
    name: any;
    price: any;
    image: any;
  }) => {
    console.log('trigger');
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: amount, // Use the 'amount' as quantity
      })
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <NavbarPage />
      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24">
              <img
                src={images.img1}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img1)}
              />
              <img
                src={images.img2}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img2)}
              />
              <img
                src={images.img3}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img3)}
              />
              <img
                src={images.img4}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img4)}
              />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                Special Sneaker
              </span>
              <h1 className="text-3xl font-bold">{data?.name}</h1>
            </div>
            <p className="text-gray-700">{data?.description}</p>
            <h6 className="text-2xl font-semibold">
              <TbCurrencyTaka /> {data?.price}
            </h6>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  handleAddToCart(data);
                }}
                className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
