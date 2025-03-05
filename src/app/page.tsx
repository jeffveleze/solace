'use client';

import { useState, KeyboardEvent, ChangeEvent } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAdvocates } from '@/hooks/advocates/useGetAdvocates';
import { columns } from './_components/tableColumns';
import { PageLoader } from './_components/loader';
import { PageError } from './_components/error';
import { EmptySearch } from './_components/emptySearch';
import { SearchBar } from './_components/header';
import { Footer } from './_components/footer';

const Home = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const { advocates, isLoading, error } = useGetAdvocates(searchValue);

  const table = useReactTable({
    data: advocates || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSearchBarKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(inputValue.trim());
    }
  };

  if (isLoading) return <PageLoader />;
  if (error) return <PageError message={error.message} />;

  return (
    <div className="w-full p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Advocates Directory
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <SearchBar
          inputValue={inputValue}
          onInputChange={onInputChange}
          onSearchBarKeyDown={onSearchBarKeyDown}
        />

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
                <EmptySearch colSpan={columns.length} />
              )}
            </TableBody>
          </Table>
        </div>

        <Footer
          numRows={table.getRowModel().rows.length}
          totalRows={advocates?.length || 0}
        />
      </div>
    </div>
  );
};

export default Home;
