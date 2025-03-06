import { TableCell, TableRow } from '@/components/ui/table';
import { columns } from './tableColumns';

export const EmptySearch = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-24 text-center text-gray-500"
      >
        No results found.
      </TableCell>
    </TableRow>
  );
};
