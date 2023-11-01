'use client';
import { useAddorderMutation } from '@/redux/api/orderApi/orderApi';
import { useAppSelector } from '@/redux/hooks';
import { getUserInfo } from '@/services/auth.service';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import Footer from '../home/footer';
import NavbarPage from './../home/navbar';

const CheckoutPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [addOrder] = useAddorderMutation();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalSum = useAppSelector((state) => state.cart.totalSum);
  const { userId } = getUserInfo() as any;
  const orderProduct: any[] = cartItems.map((cartItem) => ({
    productId: cartItem.id,
    quantity: cartItem.quantity,
  }));
  const totalAmount = totalSum + 60;
  const onSubmit = async (data: any) => {
    data.userId = userId;
    data.orderProduct = orderProduct;
    data.totalAmount = totalAmount;
    data.status = 'pending';
    const res = await addOrder(data).unwrap();
    if (res.id) {
      message.success('Order placed successfully');
      router.push('/');
    }
  };

  return (
    <div>
      <NavbarPage />
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading">
              Shipping Address
            </h2>
            <form
              className="justify-center w-full mx-auto"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-500"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="First Name"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-500"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-500"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Email"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-500"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="phone"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-500"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <Controller
                      name="address"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                          cols={parseInt('20')}
                          rows={parseInt('4')}
                          placeholder="Address"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-500"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="City"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      )}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label
                      className="block mb-3 text-sm font-semibold text-gray-500"
                      htmlFor="postcode"
                    >
                      Postcode
                    </label>
                    <Controller
                      name="postcode"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Post Code"
                          className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <Controller
                      name="saveInfo"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="checkbox"
                          className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                        />
                      )}
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label
                    className="block mb-3 text-sm font-semibold text-gray-500"
                    htmlFor="note"
                  >
                    Notes (Optional)
                  </label>
                  <Controller
                    name="note"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                        rows={parseInt('4')}
                        placeholder="Notes for delivery"
                      />
                    )}
                  />
                </div>
                <div className="mt-4">
                  <button
                    className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                    type="submit"
                  >
                    Process
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-3">
                {cartItems.length < 1 && (
                  <h1 className="text-center text-2xl font-bold">
                    Your shopping items is empty!
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
                        <h3 className="text-md font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[14px] text-gray-600">
                          <div>
                            <dt className="inline">Quantity:</dt>
                            <dd className="inline">{item.quantity}</dd>
                          </div>
                          <div>
                            <dt className="inline">Price:</dt>
                            <dd className="inline">{item.price}</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>TK {totalSum.toFixed(2)}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Delivary charge</dt>
                        <dd>Tk 60</dd>
                      </div>

                      {/* <div className="flex justify-between">
                        <dt>Discount</dt>
                        <dd>20</dd>
                      </div> */}

                      <div className="flex justify-between !text-base font-medium mt-5">
                        <dt>Total</dt>
                        <dd>TK {totalSum + 60}</dd>
                      </div>
                    </dl>

                    {/* <div className="flex justify-end">
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
