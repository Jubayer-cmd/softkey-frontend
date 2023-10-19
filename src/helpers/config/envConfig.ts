export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://192.168.0.31:9000/api/v1' ||
    'http://localhost:9000/api/v1'
  );
};
