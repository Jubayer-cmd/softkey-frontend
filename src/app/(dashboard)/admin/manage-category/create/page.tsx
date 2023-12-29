'use client';

import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddcategoryMutation } from '@/redux/api/adminApi/categoryApi';

import { Button, message } from 'antd';
import Form from '@/components/Froms/Form';
import FormInput from '@/components/Froms/FormInput';
import FormTextArea from '@/components/Froms/FormTextArea';
// import FormTextArea from './../../../../../components/froms/FormTextArea';

function CreateCategoryPage() {
  const [addCategory, { isLoading, error, isSuccess }] =
    useAddcategoryMutation();
  const onSubmit = async (data: any) => {
    message.loading('Creating.....');
    try {
      console.log(data);
      const res = await addCategory(data).unwrap();
      console.log(res);
      message.success('Category added successfully');
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
          { label: 'manage-category', link: `/${base}/manage-category` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">Create category</h1>
      <Form submitHandler={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="name" label="Name" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormTextArea name="description" label="Description" rows={4} />
          </div>
        </div>

        <Button
          className="btn btn-primary bg-blue-500 ml-4 mt-3"
          type="primary"
          htmlType="submit"
        >
          add
        </Button>
      </Form>
    </div>
  );
}

export default CreateCategoryPage;
