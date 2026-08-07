// ---------------------------------------------------------------------------
// pets.js — the "database" of pets available for adoption.
//
// For this assignment we keep the data in a plain JavaScript array instead of a
// real backend database (that part is optional / extra credit in the brief).
// Every pet is a simple object. The pages import this array and render it with
// React components, so adding a new pet is as easy as adding a new object here.
//
// Each pet has:
//   id          - short unique text used in the page URL  (/adopt/mochi)
//   name        - the pet's name
//   species     - "cat" or "dog"  (used by the filter and the PetAvatar drawing)
//   breed       - breed / type
//   age         - text like "2 years"
//   gender      - "Female" or "Male"
//   size        - "Small" | "Medium" | "Large"
//   color       - fur colour (hex) used to draw the cartoon avatar
//   bg          - card background colour (hex) so each pet looks distinct
//   traits      - a few short personality words (shown as little tags)
//   vaccinated  - true / false
//   desexed     - true / false (neutered / spayed)
//   goodWith    - short text, e.g. "Kids & other cats"
//   description - a longer friendly write-up for the details page
//   status      - "Available" (could later be "Adopted")
//   photo       - OPTIONAL real photo URL. Leave "" and the app will fetch a
//                 photo from a free API (and fall back to the drawn avatar).
//                 Set this to force a specific picture.
//   dogBreed    - (dogs only) the Dog CEO API breed path used to fetch a
//                 matching photo, e.g. "retriever/golden". Cats use The Cat API.
// ---------------------------------------------------------------------------

export const PETS = [
  {
    id: "mochi",
    name: "Mochi",
    species: "cat",
    breed: "Domestic Shorthair",
    age: "2 years",
    gender: "Female",
    size: "Small",
    color: "#f4b26a",
    bg: "#fff1dd",
    traits: ["Gentle", "Lap cat", "Quiet"],
    vaccinated: true,
    desexed: true,
    goodWith: "Kids & seniors",
    description:
      "Mochi is a soft, cream-coloured sweetheart who loves nothing more than a warm lap and a slow afternoon. She was surrendered when her family moved overseas. She is litter-trained, gentle with children, and greets everyone with a happy chirp.",
    status: "Available",
    photo: "",
  },
  {
    id: "simba",
    name: "Simba",
    species: "cat",
    breed: "Orange Tabby",
    age: "3 years",
    gender: "Male",
    size: "Medium",
    color: "#e8892b",
    bg: "#ffe8cf",
    traits: ["Playful", "Curious", "Chatty"],
    vaccinated: true,
    desexed: true,
    goodWith: "Older kids",
    description:
      "Simba is a bold, friendly tabby with endless curiosity. He will follow you from room to room and 'help' with everything you do. He loves feather toys and sunny windowsills, and would suit an active household that enjoys an outgoing cat.",
    status: "Available",
    photo: "",
  },
  {
    id: "luna",
    name: "Luna",
    species: "cat",
    breed: "Domestic Longhair",
    age: "1 year",
    gender: "Female",
    size: "Small",
    color: "#9aa4b2",
    bg: "#eef1f6",
    traits: ["Shy", "Sweet", "Cuddly"],
    vaccinated: true,
    desexed: false,
    goodWith: "Quiet homes",
    description:
      "Luna is a delicate grey beauty who is a little shy at first but blossoms into the most affectionate companion once she trusts you. She would do best in a calm, quiet home where she can settle in at her own pace.",
    status: "Available",
    photo: "",
  },
  {
    id: "oreo",
    name: "Oreo",
    species: "cat",
    breed: "Tuxedo",
    age: "4 years",
    gender: "Male",
    size: "Medium",
    color: "#2f2f33",
    bg: "#eceef0",
    traits: ["Calm", "Independent", "Affectionate"],
    vaccinated: true,
    desexed: true,
    goodWith: "Other cats",
    description:
      "Dressed in his smart black-and-white tuxedo, Oreo is a relaxed gentleman who enjoys a good nap and a scratch behind the ears. He is independent during the day and cuddly at night — the perfect companion for a working adopter.",
    status: "Available",
    photo: "",
  },
  {
    id: "buddy",
    name: "Buddy",
    species: "dog",
    breed: "Golden Retriever mix",
    dogBreed: "retriever/golden",
    age: "2 years",
    gender: "Male",
    size: "Large",
    color: "#e0a94e",
    bg: "#fff2d6",
    traits: ["Loyal", "Energetic", "Friendly"],
    vaccinated: true,
    desexed: true,
    goodWith: "Kids & other dogs",
    description:
      "Buddy is a big, golden bundle of joy who loves people, play and long walks. He knows 'sit' and 'shake' and is eager to learn more. He needs a home with a yard or an active owner who can give him plenty of exercise and cuddles.",
    status: "Available",
    photo: "",
  },
  {
    id: "bella",
    name: "Bella",
    species: "dog",
    breed: "Beagle",
    dogBreed: "beagle",
    age: "3 years",
    gender: "Female",
    size: "Medium",
    color: "#b07b4f",
    bg: "#f6ead9",
    traits: ["Curious", "Food-motivated", "Sociable"],
    vaccinated: true,
    desexed: true,
    goodWith: "Kids",
    description:
      "Bella is a happy beagle with a nose for adventure and a wagging tail for everyone she meets. She is very food-motivated, which makes training a breeze. She would love a family that enjoys the outdoors as much as she does.",
    status: "Available",
    photo: "",
  },
  {
    id: "rocky",
    name: "Rocky",
    species: "dog",
    breed: "Terrier mix",
    dogBreed: "terrier/border",
    age: "5 years",
    gender: "Male",
    size: "Small",
    color: "#c8a06a",
    bg: "#f3ecdd",
    traits: ["Brave", "Loyal", "Low-shedding"],
    vaccinated: true,
    desexed: true,
    goodWith: "Adults",
    description:
      "Rocky is a scruffy, big-hearted terrier who is devoted to his people. He is past the crazy puppy stage and happy with a couple of good walks a day. He would suit an adult home or a family with older children.",
    status: "Available",
    photo: "",
  },
  {
    id: "coco",
    name: "Coco",
    species: "dog",
    breed: "Poodle mix",
    dogBreed: "poodle/miniature",
    age: "1 year",
    gender: "Female",
    size: "Small",
    color: "#8a5a3c",
    bg: "#f1e6dc",
    traits: ["Smart", "Gentle", "Hypoallergenic"],
    vaccinated: true,
    desexed: false,
    goodWith: "Kids & seniors",
    description:
      "Coco is a clever little poodle mix with a soft, low-shedding coat that is great for allergy-sensitive homes. She is gentle, quick to learn, and loves to be close to her humans. A wonderful first dog for a caring family.",
    status: "Available",
    photo: "",
  },
];

// --- Small helper functions (used by several pages) -----------------------

// Find one pet by its id. Returns undefined if not found.
export function getPet(id) {
  return PETS.find((pet) => pet.id === id);
}

// Get the first few pets to show as "featured" on the home page.
export function getFeaturedPets(count = 3) {
  return PETS.slice(0, count);
}
