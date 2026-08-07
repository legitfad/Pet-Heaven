// ---------------------------------------------------------------------------
// PetAvatar — a REUSABLE component that DRAWS a friendly cat or dog face using
// SVG shapes, coloured from the pet's own data.
//
// Why draw instead of using photos? It keeps the whole app fully offline (no
// broken image links), gives every pet a distinct look, and shows a component
// generating graphics from its props. If you later have real photos, PetCard
// will show the photo instead whenever a pet's `photo` field is filled in.
//
// Props:
//   species   "cat" or "dog"
//   color     fur colour (hex)
//   bg        background colour (hex)
//   name      used for the accessible label
//   className optional extra CSS class
// ---------------------------------------------------------------------------
export default function PetAvatar({
  species = "cat",
  color = "#e0a94e",
  bg = "#fff2d6",
  name = "Pet",
  className = "",
}) {
  const label = `Illustration of ${name}, a ${species}`;

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft background panel */}
      <rect width="200" height="200" fill={bg} />

      {species === "cat" ? (
        // ---------------- CAT ----------------
        <g>
          {/* Ears */}
          <polygon points="55,62 44,18 88,48" fill={color} />
          <polygon points="145,62 156,18 112,48" fill={color} />
          {/* Inner ears */}
          <polygon points="58,56 52,30 76,48" fill="#f2a7b3" />
          <polygon points="142,56 148,30 124,48" fill="#f2a7b3" />
          {/* Head */}
          <ellipse cx="100" cy="112" rx="60" ry="54" fill={color} />
          {/* Eyes */}
          <ellipse cx="80" cy="106" rx="7.5" ry="11" fill="#2f2f33" />
          <ellipse cx="120" cy="106" rx="7.5" ry="11" fill="#2f2f33" />
          <circle cx="82.5" cy="102" r="2.4" fill="#ffffff" />
          <circle cx="122.5" cy="102" r="2.4" fill="#ffffff" />
          {/* Nose */}
          <polygon points="93,124 107,124 100,132" fill="#e58a9a" />
          {/* Mouth */}
          <path
            d="M100 132 Q100 140 90 140 M100 132 Q100 140 110 140"
            stroke="#2f2f33"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Whiskers */}
          <g stroke="#2f2f33" strokeWidth="1.6" strokeLinecap="round">
            <line x1="70" y1="126" x2="40" y2="120" />
            <line x1="70" y1="132" x2="40" y2="134" />
            <line x1="130" y1="126" x2="160" y2="120" />
            <line x1="130" y1="132" x2="160" y2="134" />
          </g>
        </g>
      ) : (
        // ---------------- DOG ----------------
        <g>
          {/* Floppy ears (drawn behind the head, tilted with a transform) */}
          <ellipse
            cx="50"
            cy="98"
            rx="19"
            ry="36"
            fill={color}
            transform="rotate(-16 50 98)"
          />
          <ellipse
            cx="150"
            cy="98"
            rx="19"
            ry="36"
            fill={color}
            transform="rotate(16 150 98)"
          />
          {/* darker shading on the ears */}
          <ellipse
            cx="50"
            cy="98"
            rx="19"
            ry="36"
            fill="#000000"
            opacity="0.12"
            transform="rotate(-16 50 98)"
          />
          <ellipse
            cx="150"
            cy="98"
            rx="19"
            ry="36"
            fill="#000000"
            opacity="0.12"
            transform="rotate(16 150 98)"
          />
          {/* Head */}
          <ellipse cx="100" cy="104" rx="56" ry="52" fill={color} />
          {/* Muzzle (lighter) */}
          <ellipse cx="100" cy="128" rx="36" ry="28" fill="#ffffff" opacity="0.7" />
          {/* Eyes */}
          <circle cx="80" cy="98" r="7.5" fill="#2f2f33" />
          <circle cx="120" cy="98" r="7.5" fill="#2f2f33" />
          <circle cx="82.5" cy="95" r="2.4" fill="#ffffff" />
          <circle cx="122.5" cy="95" r="2.4" fill="#ffffff" />
          {/* Nose */}
          <ellipse cx="100" cy="118" rx="10" ry="7.5" fill="#2f2f33" />
          {/* Mouth */}
          <path
            d="M100 125 Q100 138 88 136 M100 125 Q100 138 112 136"
            stroke="#2f2f33"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Little tongue */}
          <path d="M96 137 h8 a4 4 0 0 1 -8 0 z" fill="#e58a9a" />
        </g>
      )}
    </svg>
  );
}
