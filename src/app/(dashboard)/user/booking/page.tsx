'use client';
import UMTable from '@/components/ui/UMTable';
import { useUserOrderIdQuery } from '@/redux/api/orderApi/orderApi';
import { getUserInfo } from '@/services/auth.service';
import { Button } from 'antd';
import dayjs from 'dayjs';

export default function BookingPage() {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useUserOrderIdQuery(userId);
  console.log('fuck', data);
  const columns = [
    {
      title: 'Product',
      dataIndex: 'orderProduct',
      render: function (data: any, record: any) {
        if (record.orderProduct) {
          const productDetails = record.orderProduct.map((product: any) => {
            return `${product.product.name} (Q: ${product.quantity})`;
          });
          return productDetails.join(', '); // Display all product details as a comma-separated list, adjust formatting as needed
        } else {
          return 'N/A';
        }
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Order Date',
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
