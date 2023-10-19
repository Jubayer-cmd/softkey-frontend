"use client";
import UMTable from "@/components/ui/UMTable";
import { useAllbookingsQuery, useDeletebookingMutation } from "@/redux/api/adminApi/bookingApi";
import {
  DeleteOutlined
} from '@ant-design/icons';
import { Button, message } from "antd";
import dayjs from 'dayjs';
import Link from "next/link";
function BookingPage() {
  const query: Record<string, any> = {};
  const { data, isLoading } = useAllbookingsQuery(query);
  console.log('fuck', data);
  const [deletebooking] = useDeletebookingMutation();
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
        return (
          <>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
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

export default BookingPage