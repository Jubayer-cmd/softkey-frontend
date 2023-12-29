'use client';

import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import {
  useBlogIdQuery,
  useUpdateblogMutation,
} from '@/redux/api/adminApi/blogApi';
import { Button, message } from 'antd';
import Form from '@/components/Froms/Form';
import FormInput from '@/components/Froms/FormInput';
import FormTextArea from '@/components/Froms/FormTextArea';
// import FormTextArea from './../../../../../../components/froms/FormTextArea';

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const { data } = useBlogIdQuery(params?.id);
  const defaultValues = {
    authorName: data?.authorName || '',
    content: data?.content || '',
    title: data?.title || '',
    image: data?.image || '',
  };
  const [updateBlogs] = useUpdateblogMutation();
  console.log(data);
  const onSubmit = async (data: any) => {
    message.loading('Creating.....');
    try {
      console.log(data);
      const res = await updateBlogs(data);
      console.log(res);
      message.success('Blogs added successfully');
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const base = 'admin';
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'manage-blog', link: `/${base}/manage-blog` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">Update Blogs</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="grid grid-cols-1 gap-2">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="authorName" label="Author Name" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="title" label="Title" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormTextArea name="content" label="Contents" rows={10} />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="image" label="Image" />
          </div>
        </div>

        <Button
          className="btn btn-primary ml-4 mt-3"
          type="primary"
          htmlType="submit"
        >
          Update Blogs
        </Button>
      </Form>
    </div>
  );
}
