import React, { useState } from 'react';

const SearchBar = ({ onSearch, filterOptions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedFilter);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex gap-2">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 flex-grow"
        />
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
        
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            onSearch('', '');
          }}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;