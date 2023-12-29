"use client";
import UMTable from "@/components/ui/UMTable";
import { useAllreviewsQuery, useDeletereviewMutation } from "@/redux/api/adminApi/reviewApi";
import {
  DeleteOutlined
} from '@ant-design/icons';
import { Button, message } from "antd";
import dayjs from 'dayjs';
import Link from "next/link";
function ReviewPage() {
    const query: Record<string, any> = {};
  const { data, isLoading } = useAllreviewsQuery(query);
  console.log("fuck",data);
  const [deletereview ] = useDeletereviewMutation();
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
       title: 'Rating',
       dataIndex: 'rating',
     },
     {
       title: 'Reviews',
       dataIndex: 'content',
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
    message.loading("Deleting.....");
    try {
      //   console.log(data);
      await deletereview(id);
      message.success("Department Deleted successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <div>
      <p>reviewPage</p>
      <Link className="bg-primary" href="/admin/manage-review/create">
        <Button className="bg-blue-500" type="primary">Create</Button>
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

export default ReviewPage