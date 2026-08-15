import { useState, useEffect } from "react";
import PetAvatar from "./PetAvatar.jsx";
import { clearSavedPhoto, usePetPhoto } from "../hooks/usePetPhoto.js";

export default function PetImage({ pet }) {
  const [retry, setRetry] = useState(0);
  const photoUrl = usePetPhoto(pet, retry);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
    setRetry(0);
  }, [pet.id]);

  if (photoUrl && !broken) {
    return (
      <img
        src={photoUrl}
        alt={`${pet.name}, a ${pet.species}`}
        loading="lazy"
        onError={() => {
          clearSavedPhoto(pet.id);

          if (retry === 0) {
            setRetry(1);
          } else {
            setBroken(true);
          }
        }}
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
