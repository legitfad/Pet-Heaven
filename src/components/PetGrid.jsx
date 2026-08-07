import PetCard from "./PetCard.jsx";

// ---------------------------------------------------------------------------
// PetGrid — reusable component that arranges a list of pets into a responsive
// grid of PetCards. If the list is empty (for example, a search with no
// matches) it shows a friendly message instead of a blank space.
// ---------------------------------------------------------------------------
export default function PetGrid({ pets, emptyMessage = "No pets to show right now." }) {
  if (!pets || pets.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
