"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { useDeleteproductMutation, useProductsQuery } from "@/redux/api/adminApi/productApi";
import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
export default function ProductPage() {
   const query: Record<string, any> = {};

   const [page, setPage] = useState<number>(1);
   const [size, setSize] = useState<number>(10);
   const [sortBy, setSortBy] = useState<string>('');
   const [sortOrder, setSortOrder] = useState<string>('');
   const [searchTerm, setSearchTerm] = useState<string>('');
   const [deleteProduct] = useDeleteproductMutation();

   query['limit'] = size;
   query['page'] = page;
   query['sortBy'] = sortBy;
   query['sortOrder'] = sortOrder;
   // query["searchTerm"] = searchTerm;

   const debouncedTerm = useDebounced({
     searchQuery: searchTerm,
     delay: 600,
   });

   if (!!debouncedTerm) {
     query['searchTerm'] = debouncedTerm;
   }
   const { data, isLoading } = useProductsQuery({ ...query });
console.log(data);
   const products = data?.products;
   const meta = data?.meta;

   const deleteHandler = async (id: string) => {
     message.loading('Deleting.....');
     try {
       //   console.log(data);
       const res = await deleteProduct(id);
       if (res) {
         message.success('Offered Course Deleted successfully');
       }
     } catch (err: any) {
       //   console.error(err.message);
       message.error(err.message);
     }
   };

   const columns = [
     {
       title: 'Name',
       dataIndex: 'name',
       sorter: true,
       render: function (data: any) {
         return <>{data?.title}</>;
       },
     },
     {
       title: 'Description',
       dataIndex: 'description',
       sorter: true,
       render: function (data: any) {
         return <>{data?.title}</>;
       },
     },
     {
       title: 'Price',
       dataIndex: 'price',
       sorter: true,
       render: function (data: any) {
         return <>{data?.title}</>;
       },
     },
     {
       title: 'Stock',
       dataIndex: 'stock',
       sorter: true,
       render: function (data: any) {
         return <>{data?.title}</>;
       },
     },
     {
       title: 'Quantity',
       dataIndex: 'quantity',
       sorter: true,
       render: function (data: any) {
         return <>{data?.title}</>;
       },
     },
     {
       title: 'CreatedAt',
       dataIndex: 'createdAt',
       render: function (data: any) {
         return data && dayjs(data).format('MMM D, YYYY hh:mm A');
       },
       sorter: true,
     },
     {
       title: 'Action',
       render: function (data: any) {
         return (
           <>
             <Link href={`/admin/offered-course/edit/${data?.id}`}>
               <Button
                 style={{
                   margin: '0px 5px',
                 }}
                 onClick={() => console.log(data)}
                 type="primary"
               >
                 <EditOutlined />
               </Button>
             </Link>
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

   const onPaginationChange = (page: number, pageSize: number) => {
     console.log('Page:', page, 'PageSize:', pageSize);
     setPage(page);
     setSize(pageSize);
   };
   const onTableChange = (pagination: any, filter: any, sorter: any) => {
     const { order, field } = sorter;
     // console.log(order, field);
     setSortBy(field as string);
     setSortOrder(order === 'ascend' ? 'asc' : 'desc');
   };

   const resetFilters = () => {
     setSortBy('');
     setSortOrder('');
     setSearchTerm('');
   };

  return (
    <div>
      <p> manage-product</p>
      <Link className="bg-blue-500" href="/admin/manage-product/create">
        <Button className="bg-blue-500" type="primary">
          Create
        </Button>
      </Link>

      <div>
        <UMBreadCrumb
          items={[
            {
              label: 'admin',
              link: '/admin',
            },
          ]}
        />
        <ActionBar title="Student List">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '20%',
            }}
          />
          <div>
            <Link href="/admin/manage-student/create">
              <Button type="primary">Create</Button>
            </Link>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                style={{ margin: '0px 5px' }}
                type="primary"
                onClick={resetFilters}
              >
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </ActionBar>

        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={products}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
