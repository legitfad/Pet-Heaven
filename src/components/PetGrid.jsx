import PetCard from "./PetCard.jsx";

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
