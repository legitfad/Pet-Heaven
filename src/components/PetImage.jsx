import { useState, useEffect } from "react";
import PetAvatar from "./PetAvatar.jsx";
import { usePetPhoto } from "../hooks/usePetPhoto.js";

// ---------------------------------------------------------------------------
// PetImage — shows a pet's photo, with the drawn PetAvatar as a safety net.
//
// It asks the usePetPhoto hook for a real photo (fetched from a free animal
// API and cached). If there is no photo yet, or if the image fails to load
// (e.g. no internet), it quietly falls back to the offline SVG avatar — so a
// pet card is never blank or broken.
//
// This one component is reused by PetCard and PetDetails.
// ---------------------------------------------------------------------------
export default function PetImage({ pet }) {
  const { url } = usePetPhoto(pet);
  const [broken, setBroken] = useState(false);

  // If we switch to a different pet, forget any previous load error.
  useEffect(() => {
    setBroken(false);
  }, [pet.id]);

  if (url && !broken) {
    return (
      <img
        src={url}
        alt={`${pet.name}, a ${pet.species}`}
        loading="lazy"
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <PetAvatar
      species={pet.species}
      color={pet.color}
      bg={pet.bg}
      name={pet.name}
    />
  );
}
