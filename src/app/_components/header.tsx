import { ChangeEvent, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchBarKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  inputValue,
  onInputChange,
  onSearchBarKeyDown,
}: SearchBarProps) => {
  return (
    <div className="p-4 border-b">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search advocates..."
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onSearchBarKeyDown}
          className="pl-10 pr-4 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
        />
      </div>
    </div>
  );
};
