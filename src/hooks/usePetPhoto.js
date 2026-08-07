import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// usePetPhoto — a reusable custom hook that finds a real photo for a pet using
// free, no-key animal APIs, and remembers it so the pet keeps the SAME photo
// on every visit.
//
//   Dogs -> Dog CEO API      (https://dog.ceo)      photo matched to the breed
//   Cats -> The Cat API      (https://thecatapi.com) a random cat photo
//
// How it decides what to show:
//   1. If the pet has a `photo` set in the data, always use that.
//   2. Else, if we fetched one before, reuse the cached URL (from localStorage).
//   3. Else, fetch a new one from the correct API and cache it.
//
// If the network is down or the fetch fails, `url` stays empty and the
// component (PetImage) simply draws the offline avatar instead.
// ---------------------------------------------------------------------------

const CACHE_PREFIX = "petHavenPhoto:";

// Read a previously-saved photo URL for this pet (if any).
function readCache(id) {
  try {
    return window.localStorage.getItem(CACHE_PREFIX + id) || "";
  } catch {
    return "";
  }
}

// Save a photo URL so the pet keeps the same picture next time.
function writeCache(id, url) {
  try {
    window.localStorage.setItem(CACHE_PREFIX + id, url);
  } catch {
    // Ignore storage errors (e.g. private browsing).
  }
}

export function usePetPhoto(pet) {
  // Work out the best photo we already know about, before any fetching.
  const known = pet.photo || readCache(pet.id) || "";
  const [url, setUrl] = useState(known);
  const [loading, setLoading] = useState(!known);

  useEffect(() => {
    // Re-check when we switch to a different pet.
    const cached = pet.photo || readCache(pet.id) || "";
    if (cached) {
      setUrl(cached);
      setLoading(false);
      return;
    }

    // Nothing cached — fetch a fresh photo from the right API.
    setUrl("");
    setLoading(true);
    let cancelled = false;

    async function fetchPhoto() {
      try {
        // Pick the right API and URL for this pet.
        let endpoint;
        if (pet.species === "dog") {
          endpoint = pet.dogBreed
            ? `https://dog.ceo/api/breed/${pet.dogBreed}/images/random`
            : "https://dog.ceo/api/breeds/image/random"; // any dog
        } else {
          endpoint = "https://api.thecatapi.com/v1/images/search"; // any cat
        }

        const res = await fetch(endpoint);
        const data = await res.json();

        // The two APIs return the URL in different shapes.
        const found = pet.species === "dog" ? data.message : data[0] && data[0].url;

        if (!cancelled && found) {
          setUrl(found);
          writeCache(pet.id, found);
        }
      } catch {
        // Leave url empty -> the avatar fallback will be shown.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPhoto();
    return () => {
      cancelled = true;
    };
    // We only need to re-run when the pet changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pet.id]);

  return { url, loading };
}
