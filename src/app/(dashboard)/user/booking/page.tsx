'use client';
import UMTable from '@/components/ui/UMTable';
import { useUserbookingByIdQuery } from '@/redux/api/adminApi/bookingApi';
import { getUserInfo } from '@/services/auth.service';
import { Button } from 'antd';
import dayjs from 'dayjs';

export default function BookingPage() {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useUserbookingByIdQuery(userId);
  console.log('fuck', data);
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
            <Button onClick={() => {}} type="primary" danger>
              Cancel
            </Button>
          </>
        );
      },
    },
  ];

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
    </div>
  );
}
