'use client';
import UMTable from '@/components/ui/UMTable';
import {
  useAllServicesQuery,
  useDeleteserviceMutation,
} from '@/redux/api/adminApi/serviceApi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Link from 'next/link';
function ServicePage() {
  const query: Record<string, any> = {};
  const { data, isLoading } = useAllServicesQuery(query);
  console.log('fuck', data);
  const [deleteService] = useDeleteserviceMutation();
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
            <Link href={`/admin/manage-service/edit/${data?.id}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                className="bg-blue-500"
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
      <p>ServicePage</p>
      <Link className="bg-primary" href="/admin/manage-service/create">
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

export default ServicePage;
