'use client';
import UMTable from '@/components/ui/UMTable';
import { useAllblogsQuery, useDeleteblogMutation } from '@/redux/api/adminApi/blogApi';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Link from 'next/link';

function BlogsPage() {
  const query: Record<string, any> = {};
  const { data, isLoading } = useAllblogsQuery(query);
  const [deleteBlog] = useDeleteblogMutation();
  const columns = [
    {
      title: 'Author Name',
      dataIndex: 'authorName',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
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
      await deleteBlog(id);
      message.success('Blogs Deleted successfully');
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  return (
    <div>
      <h1>Blogs Page</h1>
      <Link className="bg-blue-500" href="/admin/manage-blog/create">
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

export default BlogsPage;
