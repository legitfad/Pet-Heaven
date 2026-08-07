import { Link } from "react-router-dom";
import PetImage from "./PetImage.jsx";

// ---------------------------------------------------------------------------
// PetCard — a reusable card that previews ONE pet.
//
// The SAME component is used in two places:
//   - the Home page "featured pets" strip, and
//   - the Adopt page grid of all pets.
// This is exactly what component-based design is about: build once, reuse many.
//
// If the pet has a real `photo`, it shows that; otherwise it draws the cartoon
// PetAvatar. The whole picture links to that pet's details page.
// ---------------------------------------------------------------------------
export default function PetCard({ pet }) {
  return (
    <article className="pet-card">
      <Link
        to={`/adopt/${pet.id}`}
        className="pet-card-media"
        aria-label={`View details for ${pet.name}`}
      >
        <PetImage pet={pet} />
        <span className={"pet-badge " + pet.species}>
          {pet.species === "cat" ? "Cat" : "Dog"}
        </span>
      </Link>

      <div className="pet-card-body">
        <h3>{pet.name}</h3>
        <p className="pet-meta">
          {pet.breed} · {pet.age} · {pet.gender}
        </p>
        <div className="pet-traits">
          {pet.traits.map((trait) => (
            <span key={trait} className="tag">
              {trait}
            </span>
          ))}
        </div>
        <Link className="pet-card-link" to={`/adopt/${pet.id}`}>
          Meet {pet.name} →
        </Link>
      </div>
    </article>
  );
}
