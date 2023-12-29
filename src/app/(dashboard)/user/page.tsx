'use client';
import Form from '@/components/Froms/Form';
import FormInput from '@/components/Froms/FormInput';
import {
  useUpdateuserMutation,
  useUserIdQuery,
} from '@/redux/api/adminApi/userApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, message } from 'antd';

export default function UserPage() {
  const { userId } = getUserInfo() as any;
  const { data } = useUserIdQuery(userId);
  const id = data?.id;
  console.log(data);
  const [updateUser] = useUpdateuserMutation();

  const defaultValues = {
    name: data?.name || '',
    email: data?.email || '',
    contactNo: data?.contactNo || '',
    address: data?.address || '',
    image: data?.image || '',
  };

  const onSubmit = async (datas: any) => {
    message.loading('Updating.....');
    try {
      console.log('given', datas);
      const res = await updateUser({ id, body: datas });
      console.log(res);
      message.success('Department added successfully');
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = 'user';
  return (
    <div>
      <div>
        <h1 className="text-3xl my-3 font-bold pl-4">Update Profile</h1>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
              <FormInput name="name" label="Name" />
            </div>
            <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
              <FormInput name="email" label="Email" readonly={true} />
            </div>
            <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
              <FormInput name="image" label="Image" />
            </div>
            <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
              <FormInput name="address" label="Address" />
            </div>
            <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
              <FormInput name="contactNo" label="Phone" />
            </div>
          </div>

          <Button
            className="bg-blue-500 ml-4 mt-3"
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}
