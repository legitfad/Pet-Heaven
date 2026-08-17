import { Link } from "react-router-dom";
import PetImage from "./PetImage.jsx";

export default function PetCard({ pet }) {
  return (
    <article className="pet-card">
      <Link to={`/adopt/${pet.id}`} className="pet-card-media">
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
