'use client';

import { SelectOptions } from '@/components/froms/FormMultiSelectField';
import FormSelectField from '@/components/froms/FormSelectField';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAllcategorysQuery } from '@/redux/api/adminApi/categoryApi';
import {
  useProductIdQuery,
  useUpdateproductMutation,
} from '@/redux/api/adminApi/productApi';
import { Button, message } from 'antd';
import Form from './../../../../../../components/froms/Form';
import FormInput from './../../../../../../components/froms/FormInput';
import FormTextArea from './../../../../../../components/froms/FormTextArea';

export default function UpdateProduct({ params }: { params: { id: string } }) {
  const { data } = useProductIdQuery(params?.id);
  console.log(data);
  const [updateProduct] = useUpdateproductMutation();
  const { data: categoryID, isLoading } = useAllcategorysQuery({});
  const defaultValues = {
    name: data?.name || '',
    description: data?.description || '',
    image: data?.image || '',
    price: data?.price || '',
    stock: data?.stock || '',
    quantity: data?.quantity || '',
    categoryId: data?.categoryId || '',
  };
  const onSubmit = async (datas: any) => {
    message.loading('Updating.....');
    try {
      datas.price = parseInt(datas.price);
      datas.quantity = parseInt(datas.quantity);
      const id = data?.id;
      const res = await updateProduct({ id, body: datas }).unwrap();
      console.log('dssssss', res);
      if ('id' in res) {
        message.success('Product Updated successfully');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const categoryOptions = categoryID?.map(
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
      <h1 className="text-3xl my-3 font-bold pl-4">Update Product</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="grid grid-cols-1">
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
          className="btn btn-primary ml-4 mt-3 bg-blue-500"
          type="primary"
          htmlType="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
