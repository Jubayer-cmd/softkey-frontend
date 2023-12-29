export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://softkey-backend-mticc823u-jubayer-cmd.vercel.app/api/v1'
  );
};
