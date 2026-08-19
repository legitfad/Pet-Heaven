import { useState } from "react";
import { PETS } from "../data/pets.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import PetImage from "../components/PetImage.jsx";

export default function Quiz() {
  const [animal, setAnimal] = useState("");
  const [energy, setEnergy] = useState("");
  const [home, setHome] = useState("");
  const [match, setMatch] = useState(null);

  function chooseMatch(ev) {
    ev.preventDefault();

    let bestPet = PETS[0];
    let bestScore = -1;

    for (let i = 0; i < PETS.length; i++) {
      const pet = PETS[i];
      let score = 0;

      if (animal === "any" || pet.species === animal) {
        score += 3;
      }

      if (energy === "calm" && pet.traits.includes("Calm")) score += 2;
      if (energy === "calm" && pet.traits.includes("Quiet")) score += 2;
      if (energy === "playful" && pet.traits.includes("Playful")) score += 2;
      if (energy === "playful" && pet.traits.includes("Energetic")) score += 2;
      if (energy === "friendly" && pet.traits.includes("Friendly")) score += 2;
      if (energy === "friendly" && pet.traits.includes("Sociable")) score += 2;

      if (home === "kids" && pet.goodWith.includes("Kids")) score += 2;
      if (home === "quiet" && pet.goodWith.includes("Quiet")) score += 2;
      if (home === "adults" && pet.goodWith.includes("Adults")) score += 2;

      if (score > bestScore) {
        bestScore = score;
        bestPet = pet;
      }
    }

    setMatch(bestPet);
  }

  return (
    <div className="container section narrow">
      <SectionHeading
        as="h1"
        eyebrow="Pet quiz"
        title="Find your pet match"
        subtitle="Answer a few quick questions and we will suggest a pet that may suit your home."
      />

      <form className="form-card quiz-form" onSubmit={chooseMatch}>
        <div className="form-field">
          <label>Which pet do you prefer?</label>
          <select
            className="control"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            required
          >
            <option value="">Please choose...</option>
            <option value="any">Any pet</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </div>

        <div className="form-field">
          <label>What personality do you like?</label>
          <select
            className="control"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            required
          >
            <option value="">Please choose...</option>
            <option value="calm">Calm and quiet</option>
            <option value="playful">Playful and active</option>
            <option value="friendly">Friendly and social</option>
          </select>
        </div>

        <div className="form-field">
          <label>What kind of home do you have?</label>
          <select
            className="control"
            value={home}
            onChange={(e) => setHome(e.target.value)}
            required
          >
            <option value="">Please choose...</option>
            <option value="kids">Home with kids</option>
            <option value="quiet">Quiet home</option>
            <option value="adults">Adult home</option>
          </select>
        </div>

        <Button type="submit">Show my match</Button>
      </form>

      {match && (
        <div className="quiz-result">
          <div className="quiz-photo">
            <PetImage pet={match} />
          </div>
          <div>
            <p className="request-type">Your match</p>
            <h2>{match.name}</h2>
            <p className="pet-meta">
              {match.breed} · {match.age} · {match.gender}
            </p>
            <p>{match.description}</p>
            <div className="btn-row">
              <Button to={`/adopt/${match.id}`}>Meet {match.name}</Button>
              <Button to="/adopt" variant="ghost">
                View all pets
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
