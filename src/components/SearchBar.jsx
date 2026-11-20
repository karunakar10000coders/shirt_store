function SearchBar({ searchTerm, onSearch, category, onCategoryChange, categories }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search shirts..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button className="search-clear" onClick={() => onSearch("")}>✕</button>
        )}
      </div>
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  )
}

export default SearchBar
