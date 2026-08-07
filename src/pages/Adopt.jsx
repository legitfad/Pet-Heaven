import { useState, useMemo } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";
import PetGrid from "../components/PetGrid.jsx";
import { PETS } from "../data/pets.js";

// ---------------------------------------------------------------------------
// Adopt — lists every pet available for adoption, with a search box and a
// Cats/Dogs filter (an "extra friendly feature for browsing and searching").
//
// This page OWNS the search text and the chosen filter in state. Whenever
// either changes we recalculate the visible list with useMemo (which only
// re-runs the filtering when the inputs actually change).
// ---------------------------------------------------------------------------
export default function Adopt() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "cat" | "dog"

  const visiblePets = useMemo(() => {
    const term = search.trim().toLowerCase();
    return PETS.filter((pet) => {
      const matchesType = filter === "all" || pet.species === filter;
      const matchesSearch =
        term === "" ||
        pet.name.toLowerCase().includes(term) ||
        pet.breed.toLowerCase().includes(term);
      return matchesType && matchesSearch;
    });
  }, [search, filter]);

  return (
    <div className="container section">
      <SectionHeading
        as="h1"
        eyebrow="Adopt"
        title="Pets looking for a loving home"
        subtitle="Browse the cats and dogs currently in our care. Click any pet to learn more about them."
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        resultCount={visiblePets.length}
      />

      <PetGrid
        pets={visiblePets}
        emptyMessage="No pets match your search. Try a different name, or choose 'All pets'."
      />
    </div>
  );
}
