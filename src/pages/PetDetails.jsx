import { useParams, Link } from "react-router-dom";
import { getPet } from "../data/pets.js";
import PetImage from "../components/PetImage.jsx";
import Button from "../components/Button.jsx";

export default function PetDetails() {
  const { id } = useParams();
  const pet = getPet(id);

  if (!pet) {
    return (
      <div className="container section narrow">
        <h1>Pet not found</h1>
        <p>
          Sorry, we could not find that pet. It may already have found a loving
          home.
        </p>
        <Button to="/adopt">Back to all pets</Button>
      </div>
    );
  }

  return (
    <div className="container section">
      <p className="breadcrumb">
        <Link to="/adopt">← All pets</Link>
      </p>

      <div className="pet-detail">
        <div className="pet-detail-media" style={{ background: pet.bg }}>
          <PetImage pet={pet} />
        </div>

        <div className="pet-detail-info">
          <span className={"pet-badge " + pet.species}>
            {pet.species === "cat" ? "Cat" : "Dog"}
          </span>
          <h1>{pet.name}</h1>
          <p className="pet-meta">
            {pet.breed} · {pet.age} · {pet.gender} · {pet.size}
          </p>

          <div className="pet-traits">
            {pet.traits.map((trait) => (
              <span key={trait} className="tag">
                {trait}
              </span>
            ))}
          </div>

          <p className="pet-description">{pet.description}</p>

          <ul className="pet-facts">
            <li>
              <span>Vaccinated</span>
              <strong>{pet.vaccinated ? "Yes" : "In progress"}</strong>
            </li>
            <li>
              <span>Desexed</span>
              <strong>{pet.desexed ? "Yes" : "In progress"}</strong>
            </li>
            <li>
              <span>Good with</span>
              <strong>{pet.goodWith}</strong>
            </li>
            <li>
              <span>Status</span>
              <strong>{pet.status}</strong>
            </li>
          </ul>

          <div className="btn-row">
            <Button to={`/adopt/${pet.id}/request`}>
              Request to adopt {pet.name}
            </Button>
            <Button to="/adopt" variant="ghost">
              Keep browsing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
