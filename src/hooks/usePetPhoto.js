import { useEffect, useState } from "react";

const CACHE_KEY = "petHeavenPhoto:";

function getSavedPhoto(id) {
  return localStorage.getItem(CACHE_KEY + id) || "";
}

function savePhoto(id, url) {
  localStorage.setItem(CACHE_KEY + id, url);
}

export function clearSavedPhoto(id) {
  localStorage.removeItem(CACHE_KEY + id);
}

async function fetchDogPhoto(pet) {
  const endpoint = pet.dogBreed
    ? `https://dog.ceo/api/breed/${pet.dogBreed}/images/random`
    : "https://dog.ceo/api/breeds/image/random";
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.message;
}

async function fetchCatPhoto() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
  const data = await response.json();
  return data[0]?.url || "";
}

function getBackupPhoto(pet) {
  if (pet.species === "cat") {
    return "https://cataas.com/cat?width=600&height=400&pet=" + pet.id;
  }

  return "";
}

async function fetchPhoto(pet, useBackup) {
  if (useBackup) {
    return getBackupPhoto(pet);
  }

  if (pet.species === "dog") {
    return fetchDogPhoto(pet);
  }

  return fetchCatPhoto();
}

export function usePetPhoto(pet, retry) {
  const [photoUrl, setPhotoUrl] = useState(pet.photo || getSavedPhoto(pet.id));

  useEffect(() => {
    let cancelled = false;
    const savedPhoto = retry ? "" : pet.photo || getSavedPhoto(pet.id);

    if (savedPhoto) {
      setPhotoUrl(savedPhoto);
      return;
    }

    setPhotoUrl("");

    async function loadPhoto() {
      try {
        const url = await fetchPhoto(pet, retry > 0);

        if (!cancelled && url) {
          savePhoto(pet.id, url);
          setPhotoUrl(url);
        }
      } catch {
        const backup = getBackupPhoto(pet);

        if (!cancelled && backup) {
          setPhotoUrl(backup);
        }
      }
    }

    loadPhoto();

    return () => {
      cancelled = true;
    };
  }, [pet, retry]);

  return photoUrl;
}
