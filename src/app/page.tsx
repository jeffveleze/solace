'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAdvocates } from '@/hooks/advocates/useGetAdvocates';
import { Advocate } from '@/types/advocate';
import { Loader } from 'lucide-react';

export const columns: ColumnDef<Advocate>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'degree',
    header: 'Degree',
  },
  {
    accessorKey: 'specialties',
    header: 'Specialties',
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-2 my-2">
          {row.original.specialties
            ? (row.original.specialties as string[]).map(
                (specialty: string) => (
                  <div
                    key={specialty}
                    className="bg-gray-100 px-2 py-1 rounded-md"
                  >
                    {specialty}
                  </div>
                )
              )
            : null}
        </div>
      );
    },
  },
  {
    accessorKey: 'yearsOfExperience',
    header: 'Years of Experience',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
];

const globalFilter = (row: any, columnId: string, filterValue: string) => {
  const value = row.getValue(columnId);
  if (value === null || value === undefined) return false;
  return String(value)
    .toLowerCase()
    .includes(String(filterValue).toLowerCase());
};

const Home = () => {
  const { advocates, isLoading, error } = useGetAdvocates();
  const table = useReactTable({
    data: advocates || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      global: globalFilter,
    },
    globalFilterFn: globalFilter,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10" />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!advocates) return <div>No advocates found</div>;

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter advocates..."
          value={table.getState().globalFilter || ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
