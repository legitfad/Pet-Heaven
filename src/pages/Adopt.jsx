import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";
import PetGrid from "../components/PetGrid.jsx";
import Button from "../components/Button.jsx";
import { PETS } from "../data/pets.js";

export default function Adopt() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const term = search.trim().toLowerCase();
  const visiblePets = PETS.filter((pet) => {
    const matchesType = filter === "all" || pet.species === filter;
    const matchesSearch =
      pet.name.toLowerCase().includes(term) ||
      pet.breed.toLowerCase().includes(term);

    return matchesType && matchesSearch;
  });

  return (
    <div className="container section">
      <SectionHeading
        as="h1"
        eyebrow="Adopt"
        title="Pets looking for a loving home"
        subtitle="Browse the cats and dogs currently in our care. Click any pet to learn more about them."
      />
      <div className="quiz-box">
        <p>Not sure which pet suits you?</p>
        <Button to="/quiz" size="sm">Try the match quiz</Button>
      </div>

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
