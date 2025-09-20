import { Search, Filter, Tag } from 'lucide-react';

function SearchAndFilter({ searchTerm, setSearchTerm, sortBy, setSortBy, filterTag, setFilterTag, availableTags }) {
  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'pinned', label: 'Pinned First' }
  ];

  return (
    <div className="search-filter-container">
      <div className="search-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="filter-controls">
        <div className="sort-control">
          <Filter size={16} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="tag-filter">
          <Tag size={16} />
          <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
            <option value="">All Tags</option>
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;