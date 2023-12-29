'use client';

import { SelectOptions } from '@/components/Froms/FormMultiSelectField';
import FormSelectField from '@/components/Froms/FormSelectField';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAllcategorysQuery } from '@/redux/api/adminApi/categoryApi';
import { useAddproductMutation } from '@/redux/api/adminApi/productApi';
import { Button, message } from 'antd';
import Form from '@/components/Froms/Form';
import FormInput from '@/components/Froms/FormInput';
import FormTextArea from '@/components/Froms/FormTextArea';

function CreateProducts() {
  const { data, isLoading } = useAllcategorysQuery({});
  const [createProduct] = useAddproductMutation();
  const onSubmit = async (data: any) => {
    message.loading('Creating.....');
    try {
      console.log(data);
      const res = await createProduct(data).unwrap();
      console.log(res);
      message.success('Department added successfully');
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const categoryOptions = data?.map(
    (category: { name: string; id: number }) => {
      return {
        label: category?.name,
        value: category?.id,
      };
    }
  );
  const base = 'admin';
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'manage-product', link: `/${base}/manage-product` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">Create Product</h1>
      <Form submitHandler={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="name" label="Name" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="image" label="Image" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormTextArea name="description" label="Description" rows={4} />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="price" label="price" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="stock" label="stock" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="quantity" label="quantity" />
          </div>
          <div style={{ margin: '10px 0px' }}>
            <FormSelectField
              options={categoryOptions as SelectOptions[]}
              name="categoryId"
              label="Category"
            />
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

export default CreateProducts;
