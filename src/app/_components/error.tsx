export const PageError = ({ message }: { message: string }) => {
  return <div className="p-8 text-red-500">Error: {message}</div>;
};
