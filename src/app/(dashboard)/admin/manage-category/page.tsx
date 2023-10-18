'use client';
import UMTable from '@/components/ui/UMTable';
import { useAllcategorysQuery, useDeletecategoryMutation } from '@/redux/api/adminApi/categoryApi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Link from 'next/link';

function CategoryPage() {
  const query: Record<string, any> = {};
  const { data, isLoading } = useAllcategorysQuery(query);
  const [deleteService] = useDeletecategoryMutation();
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/department/edit/${data?.id}`}>
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

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      //   console.log(data);
      await deleteService(id);
      message.success('Department Deleted successfully');
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <div>
      <h1>categoryPage</h1>
      <Link className="bg-blue-500" href="/admin/manage-category/create">
        <Button className="bg-blue-500" type="primary">
          Create
        </Button>
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

export default CategoryPage;
