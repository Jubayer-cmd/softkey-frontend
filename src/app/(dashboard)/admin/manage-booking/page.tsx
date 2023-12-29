'use client';
import UMTable from '@/components/ui/UMTable';
import {
  useAllbookingsQuery,
  useDeletebookingMutation,
  useUpdatebookingMutation,
} from '@/redux/api/adminApi/bookingApi';
import { Button, Select, message } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
enum BookingStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  completed = 'completed',
  canceled = 'canceled',
}
function BookingPage() {
  const query: Record<string, any> = {};
  const { data, isLoading } = useAllbookingsQuery(query);
  const { Option } = Select;

  const orderStatusOptions = Object.values(BookingStatus);
  const [deletebooking] = useDeletebookingMutation();
  const [updateBooking] = useUpdatebookingMutation();
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
      title: 'Date & Time',
      dataIndex: 'date',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
    },
    {
      title: 'Action',
      render: function (data: any) {
        const handleStatusChange = async (selectedStatus: any) => {
          const id = data?.id;
          const updatedObject = {
            id,
            body: {
              status: selectedStatus,
            },
          };
          const res = await updateBooking(updatedObject).unwrap();
          if (res.id) {
            message.success('Booking status updated successfully');
          }
        };

        return (
          <>
            <Select defaultValue={data.status} onChange={handleStatusChange}>
              {orderStatusOptions.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
            <Button onClick={() => {}} type="primary" danger>
              Cancel
            </Button>
          </>
        );
      },
    },
  ];

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      //   console.log(data);
      await deletebooking(id);
      message.success('Department Deleted successfully');
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <div>
      <p>bookingPage</p>
      <Link className="bg-primary" href="/admin/manage-booking/create">
        <Button type="primary">Create</Button>
      </Link>

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

export default BookingPage;
