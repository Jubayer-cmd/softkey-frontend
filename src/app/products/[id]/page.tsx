export default function ProductDetails({ params }: { params: { id: string } }) {
  return <div>page:{params?.id}</div>;
}
