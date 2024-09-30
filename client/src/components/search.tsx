import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white shadow-md rounded-lg overflow-hidden p-2 max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-3 text-gray-700 border-none focus:outline-none focus:ring-0"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
