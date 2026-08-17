export default function SearchFilterBar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  resultCount,
}) {
  const chips = [
    { key: "all", label: "All pets" },
    { key: "cat", label: "Cats" },
    { key: "dog", label: "Dogs" },
  ];

  return (
    <div className="search-filter">
      <div className="search-box">
        <label>Search pets</label>
        <input
          type="search"
          className="control"
          placeholder="Search by name or breed…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-chips">
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            className={"chip" + (filter === chip.key ? " chip-active" : "")}
            onClick={() => onFilterChange(chip.key)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <p className="result-count">
        {resultCount} {resultCount === 1 ? "pet" : "pets"} found
      </p>
    </div>
  );
}
