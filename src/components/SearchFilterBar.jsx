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
        <label htmlFor="petSearch" className="sr-only">
          Search pets by name or breed
        </label>
        <input
          id="petSearch"
          type="search"
          className="control"
          placeholder="Search by name or breed…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-chips" role="group" aria-label="Filter pets by type">
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            className={"chip" + (filter === chip.key ? " chip-active" : "")}
            aria-pressed={filter === chip.key}
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
