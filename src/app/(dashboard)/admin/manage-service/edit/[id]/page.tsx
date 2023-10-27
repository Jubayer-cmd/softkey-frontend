'use client';
import Form from '@/components/Froms/Form';
import FormInput from '@/components/Froms/FormInput';
import FormTextArea from '@/components/Froms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import {
  useServiceIdQuery,
  useUpdateserviceMutation,
} from '@/redux/api/adminApi/serviceApi';
import { Button, message } from 'antd';

export default function UpdateService({ params }: { params: { id: string } }) {
  const { data } = useServiceIdQuery(params?.id);
  const [updateService] = useUpdateserviceMutation();
  console.log(data);
  const defaultValues = {
    name: data?.name || '',
    description: data?.description || '',
    image: data?.image || '',
  };
  const onSubmit = async (data: any) => {
    message.loading('Creating.....');
    try {
      console.log(data);
      const res = await updateService(data);
      console.log(res);
      message.success('Department added successfully');
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = 'admin';
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'manage-service', link: `/${base}/manage-service` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">Update Service</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="grid grid-cols-1">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4 py-2">
            <FormInput name="name" label="Name" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4 py-2">
            <FormInput name="image" label="Image" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4 py-2">
            <FormTextArea name="description" label="Description" rows={4} />
          </div>
        </div>

        <Button
          className="btn btn-primary ml-4 mt-3 bg-blue-500"
          type="primary"
          htmlType="submit"
        >
          Update Service
        </Button>
      </Form>
    </div>
  );
}
