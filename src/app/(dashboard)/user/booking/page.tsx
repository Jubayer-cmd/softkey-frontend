'use client';
import Form from '@/components/froms/Form';
import FormTextArea from '@/components/froms/FormTextArea';
import ReusableModal from '@/components/ui/ReusableModal';
import UMTable from '@/components/ui/UMTable';
import { useUserbookingByIdQuery } from '@/redux/api/adminApi/bookingApi';
import { useAddreviewMutation } from '@/redux/api/adminApi/reviewApi';
import { getUserInfo } from '@/services/auth.service';
import { Rating } from '@smastrom/react-rating';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
export default function BookingPage() {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useUserbookingByIdQuery(userId);
  console.log(data);
  const [addReview] = useAddreviewMutation();
  const [ratings, setRatings] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const openModal = (serviceID: string) => {
    setIsModalOpen(true);
    setSelectedService(serviceID);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: 'User',
      dataIndex: 'userId',
      render: function (data: any, record: any) {
        // Access the category name from the Category object
        const UserEmail = record.user?.email || 'User Not Found';
        return UserEmail;
      },
    },
    {
      title: 'Service Name',
      dataIndex: 'serviceId',
      render: function (data: any, record: any) {
        // Access the category name from the Category object
        const UserEmail = record.service?.name || 'Service Not Found';
        return UserEmail;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Schedule Date',
      dataIndex: 'date',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
    },
    {
      title: 'Action',
      render: function (data: any) {
        return (
          <>
            {data?.status === 'completed' && (
              <Button
                className="bg-blue-500 text-white px-2"
                onClick={() => {
                  openModal(data?.serviceId);
                }}
              >
                Review
              </Button>
            )}
            <Button onClick={() => {}} type="primary" danger>
              Cancel
            </Button>
          </>
        );
      },
    },
  ];

  const onSubmit = async (datas: any) => {
    datas.rating = ratings;
    datas.serviceId = selectedService;
    datas.userId = userId;
    console.log(datas);
    const res = await addReview(datas);
    console.log(res);
  };

  return (
    <div>
      <p>Your Orders</p>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        showSizeChanger={true}
        showPagination={true}
      />
      <ReusableModal
        title="Service Reviews"
        open={isModalOpen}
        onCancel={closeModal}
      >
        <div>
          <p className="my-3">Provide a Review for this Service</p>
          <Form submitHandler={onSubmit}>
            <div className="grid grid-cols-1 gap-2">
              <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
                <Rating
                  style={{ maxWidth: 200 }}
                  value={ratings}
                  onChange={setRatings}
                />
              </div>
              <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
                <FormTextArea name="content" label="Reviews" rows={5} />
              </div>
            </div>
            <Button
              className="btn btn-primary m-3 bg-blue-500 hover:bg-blue-700"
              type="primary"
              htmlType="submit"
            >
              Post
            </Button>
          </Form>
        </div>
      </ReusableModal>
    </div>
  );
}
