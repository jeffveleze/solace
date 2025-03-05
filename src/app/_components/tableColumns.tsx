import { ColumnDef } from '@tanstack/react-table';
import { Advocate } from '@/types/advocate';

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
