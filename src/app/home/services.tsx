'use client';

import ReusableModal from '@/components/ui/ReusableModal';
import { useAddbookingMutation } from '@/redux/api/adminApi/bookingApi';
import { useAllServicesQuery } from '@/redux/api/adminApi/serviceApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Button, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import Form from '@/components/Froms/Form';
import FormDatePicker from '@/components/Froms/FormDatePicker';
import FormTimePicker from '@/components/Froms/FormTimePicker';

export default function ServiceList() {
  const { data: services } = useAllServicesQuery({});
  const [addBooking] = useAddbookingMutation();
  const { id } = getUserInfo() as any;
  console.log("check user id",id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isUserLoggedIn = isLoggedIn();
  const [selectedService, setSelectedService] = useState({} as any);
  const openModal = (serviceID: string) => {
    setIsModalOpen(true);
    setSelectedService(serviceID);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onSubmit = async (data: any) => {
    message.loading('Booking.....');
    try {
      const dateTime = dayjs(
        `${data.date} ${data.time}`,
        'YYYY-MM-DD HH:mm'
      ).toISOString();
      data.serviceId = selectedService;
      data.date = dateTime;
      data.status = 'pending';
      data.userId = id;
      // Remove the 'time' property from the data object
      delete data.time;
      console.log('check data', data);
      const res = await addBooking(data).unwrap();
      console.log(res);
      if (typeof res === 'object' && res.hasOwnProperty('id')) {
        closeModal();
        message.success('Successfully Booked!');
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h1>Our Service</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((item: any, index: number) => (
            <div
              className="block rounded p-4 transition duration-300 ease-in-out transform hover:shadow-lg hover:border-b-4 hover:border-gray-800 hover:scale-102"
              key={index}
            >
              <img
                alt={item?.name}
                src={item?.image}
                className="h-48 w-full object-cover rounded hover:opacity-75"
              />

              <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                {item?.name}
              </h3>

              <p className="mt-2 max-w-sm text-gray-700">{item?.description}</p>

              <div className="mt-4">
                <button
                  className="fancy"
                  onClick={() => {
                    openModal(item.id);
                  }}
                >
                  <span className="top-key"></span>
                  <span className="text">Contact Us</span>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <ReusableModal
          title="Booking Schedule"
          open={isModalOpen}
          onCancel={closeModal}
        >
          {isUserLoggedIn ? (
            /* User is logged in, show logged-in content */
            <div>
              <p className="my-3">
                Please give date and time for schedule, our team will respond
                soon!
              </p>
              <Form submitHandler={onSubmit}>
                <FormDatePicker name="date" label="Select Booking Date" />
                <FormTimePicker name="time" label="Select Booking Time" />
                <Button
                  className="btn btn-primary mt-3 bg-blue-500 hover:bg-blue-700"
                  type="primary"
                  htmlType="submit"
                >
                  Book
                </Button>
              </Form>
            </div>
          ) : (
            /* User is not logged in, show login prompt */
            <p className="my-4 text-xl">Please log in to continue.</p>
          )}
        </ReusableModal>
      </div>
    </section>
  );
}
