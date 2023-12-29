'use client';
import { useProductsQuery } from '@/redux/api/adminApi/productApi';
import { removeFromCart, updateQuantity } from '@/redux/api/cartApi/cartApi';
import { useAppDispatch, useAppSelector, useDebounced } from '@/redux/hooks';
import { isLoggedIn, removeUserInfo } from '@/services/auth.service';
import { Avatar, Button, Drawer, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FaBars,
  FaBookOpen,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { authKey } from './../../constants/storageKey';

function NavbarPage() {
  const router = useRouter();
  const userLoggedIn = isLoggedIn();
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (debouncedTerm.length > 2) {
    query['searchTerm'] = debouncedTerm;
  }
  const { data, isLoading } = useProductsQuery({ ...query });

  const products = data?.products;
  const meta = data?.meta;
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalSum = useAppSelector((state) => state.cart.totalSum);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const handleUpdateQuantity = (itemId: any, quantity: number) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  const handleRemoveFromCart = (itemId: any) => {
    dispatch(removeFromCart(itemId));
  };
  let Links = [
    { name: 'HOME', link: '/home' },
    { name: 'SERVICE', link: '/' },
    { name: 'ABOUT', link: '/' },
    { name: 'CONTACT', link: '/' },
  ];
  let [toogle, setToggle] = useState(false);

  const logOut = () => {
    removeUserInfo(authKey);
    router.push('/');
  };
  const items = [
    {
      key: '0',
      label: (
        <Button
          type="text"
          onClick={() => {
            router.push('/profile');
          }}
        >
          Profile
        </Button>
      ),
    },
    {
      key: '1',
      label: (
        <Button type="text" danger onClick={logOut}>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <div className="mb-20 max-w-screen-xl ">
      <div className="shadow-md w-full fixed top-0 left-0 z-10">
        <div className="md:flex  items-center  justify-between bg-white py-4 md:px-10 px-7">
          {/* logo section */}
          <div
            onClick={() => {
              router.push('/');
            }}
            className="font-bold text-2xl cursor-pointer flex items-center gap-1"
          >
            <FaBookOpen className="w-7 h-7 text-blue-600" />
            <span>Soft-key</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              style={{width:"300px"}}
              className="w-full p-2 rounded-2xl bg-slate-800"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              debouncedTerm.length > 2 && (
                <div className="absolute top-16 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                  <ul>
                    {products.length > 0 ? (
                      products?.map((product: any) => (
                        <li key={product.id}>
                          <div
                            className="my-2 cursor-pointer bg-slate-300 rounded-md"
                            onClick={() => {
                              router.push(`/products/${product.id}`);
                            }}
                          >
                            <div className="flex items-center">
                              <img src={product?.image} className='w-14 p-2 rounded mr-2' alt="" />
                              <p> {product.name}</p>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No Product Found</p>
                    )}
                  </ul>
                </div>
              )
            )}
          </div>
          <div
            onClick={() => setToggle(!toogle)}
            className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
          >
            {toogle ? <FaTimes /> : <FaBars />}
          </div>
          {/* link items */}
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              toogle ? 'top-12' : 'top-[-490px]'
            }`}
          >
            {Links.map((link, index) => (
              <li key={index} className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link
                  href={link.link}
                  className="text-gray-800 hover:text-blue-400 duration-500"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <FaShoppingCart
              onClick={showDrawer}
              className="w-7 h-7 cursor-pointer md:ml-20 hover:text-blue-500"
            />
            {userLoggedIn ? (
              <Dropdown overlay={<Menu items={items} />}>
                <Avatar
                  className="md:ml-8 px-3 py-1"
                  size="large"
                  icon={<FaUser />}
                />
              </Dropdown>
            ) : (
              <button
                onClick={() => {
                  router.push('/login');
                }}
                className="btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
              >
                Login / Register
              </button>
            )}
          </ul>
        </div>
      </div>
      <Drawer title="YOUR CART" placement="right" onClose={onClose} open={open}>
        <section>
          <div className="mx-auto max-w-screen-xl px-1 py-2 sm:px-6 sm:py-12 lg:px-2">
            <div className="mx-auto max-w-3xl">
              <div className="mt-3">
                {cartItems.length < 1 && (
                  <h1 className="text-center text-2xl font-bold">
                    Your shopping cart is empty!
                  </h1>
                )}
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li className="flex items-center gap-4" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{item.name}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">{item.price}</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <label htmlFor="Quantity" className="sr-only">
                          {' '}
                          Quantity{' '}
                        </label>

                        <div className="flex items-center">
                          <button
                            type="button"
                            className="w-5 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                            onClick={() => {
                              if (item.quantity > 1) {
                                handleUpdateQuantity(
                                  item.id,
                                  item.quantity - 1
                                );
                              }
                            }}
                          >
                            &minus;
                          </button>

                          <input
                            type="number"
                            id={`Quantity-${item.id}`} // Use a unique identifier for each item
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value, 10);
                              if (!isNaN(newQuantity) && newQuantity >= 1) {
                                handleUpdateQuantity(item.id, newQuantity);
                              }
                            }}
                            className="h-10 w-10 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                          />

                          <button
                            type="button"
                            className="w-5 h-10 leading-10 text-gray-600 transition hover:opacity-75"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-gray-600 transition hover:text-red-600"
                          >
                            <span className="sr-only">Remove item</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-5 pl-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        {/* <dd>${totalSum.toFixed(2)}</dd> */}
                      </div>

                      <div className="flex justify-between">
                        <dt>VAT</dt>
                        <dd>£25</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Discount</dt>
                        <dd>-£20</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>TK {totalSum.toFixed(2)}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="-ms-1 me-1.5 h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>

                        <p className="whitespace-nowrap text-xs">
                          2 Discounts Applied
                        </p>
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <Link
                        href="/checkout"
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Drawer>
    </div>
  );
}

export default NavbarPage;
