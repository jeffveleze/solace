import { Loader as LucideLoader } from 'lucide-react';

export const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LucideLoader className="animate-spin h-10 w-10 text-blue-600" />
    </div>
  );
};
