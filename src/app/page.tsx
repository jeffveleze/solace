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
import { Loader, Search } from 'lucide-react';

export const columns: ColumnDef<Advocate>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('firstName')}</div>
    ),
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'city',
    header: 'City',
    cell: ({ row }) => (
      <div className="text-gray-500">{row.getValue('city')}</div>
    ),
  },
  {
    accessorKey: 'degree',
    header: 'Degree',
    cell: ({ row }) => (
      <div className="italic text-gray-600">{row.getValue('degree')}</div>
    ),
  },
  {
    accessorKey: 'specialties',
    header: 'Specialties',
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-1 my-1">
          {row.original.specialties
            ? (row.original.specialties as string[]).map(
                (specialty: string) => (
                  <div
                    key={specialty}
                    className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
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
    header: 'Experience',
    cell: ({ row }) => (
      <div className="text-center font-semibold">
        {row.getValue('yearsOfExperience')} yrs
      </div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue('phoneNumber')}</div>
    ),
  },
];

const globalFilter = (row: any, columnId: string, filterValue: string) => {
  const value = row.getValue(columnId);
  if (value === null || value === undefined) return false;

  // Handle array values (like specialties)
  if (Array.isArray(value)) {
    return value.some((item) =>
      String(item).toLowerCase().includes(String(filterValue).toLowerCase())
    );
  }

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
        <Loader className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  if (error)
    return <div className="p-8 text-red-500">Error: {error.message}</div>;
  if (!advocates)
    return <div className="p-8 text-gray-500">No advocates found</div>;

  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Advocates Directory
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search advocates..."
              value={table.getState().globalFilter || ''}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="pl-10 pr-4 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-gray-50">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`
                      hover:bg-gray-50 transition-colors
                      ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-4">
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
                    className="h-24 text-center text-gray-500"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="py-3 px-4 bg-gray-50 border-t text-sm text-gray-500">
          Showing {table.getRowModel().rows.length} of {advocates.length}{' '}
          advocates
        </div>
      </div>
    </div>
  );
};

export default Home;
