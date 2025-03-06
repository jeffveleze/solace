export const Footer = ({
  numRows,
  totalRows,
}: {
  numRows: number;
  totalRows: number;
}) => {
  return (
    <div className="py-3 px-4 bg-gray-50 border-t text-sm text-gray-500">
      Showing {numRows} of {totalRows} advocates
    </div>
  );
};
