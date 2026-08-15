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
      <rect width="200" height="200" fill={bg} />

      {species === "cat" ? (
        <g>
          <polygon points="55,62 44,18 88,48" fill={color} />
          <polygon points="145,62 156,18 112,48" fill={color} />
          <polygon points="58,56 52,30 76,48" fill="#f2a7b3" />
          <polygon points="142,56 148,30 124,48" fill="#f2a7b3" />
          <ellipse cx="100" cy="112" rx="60" ry="54" fill={color} />
          <ellipse cx="80" cy="106" rx="7.5" ry="11" fill="#2f2f33" />
          <ellipse cx="120" cy="106" rx="7.5" ry="11" fill="#2f2f33" />
          <circle cx="82.5" cy="102" r="2.4" fill="#ffffff" />
          <circle cx="122.5" cy="102" r="2.4" fill="#ffffff" />
          <polygon points="93,124 107,124 100,132" fill="#e58a9a" />
          <path
            d="M100 132 Q100 140 90 140 M100 132 Q100 140 110 140"
            stroke="#2f2f33"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <g stroke="#2f2f33" strokeWidth="1.6" strokeLinecap="round">
            <line x1="70" y1="126" x2="40" y2="120" />
            <line x1="70" y1="132" x2="40" y2="134" />
            <line x1="130" y1="126" x2="160" y2="120" />
            <line x1="130" y1="132" x2="160" y2="134" />
          </g>
        </g>
      ) : (
        <g>
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
          <ellipse cx="100" cy="104" rx="56" ry="52" fill={color} />
          <ellipse cx="100" cy="128" rx="36" ry="28" fill="#ffffff" opacity="0.7" />
          <circle cx="80" cy="98" r="7.5" fill="#2f2f33" />
          <circle cx="120" cy="98" r="7.5" fill="#2f2f33" />
          <circle cx="82.5" cy="95" r="2.4" fill="#ffffff" />
          <circle cx="122.5" cy="95" r="2.4" fill="#ffffff" />
          <ellipse cx="100" cy="118" rx="10" ry="7.5" fill="#2f2f33" />
          <path
            d="M100 125 Q100 138 88 136 M100 125 Q100 138 112 136"
            stroke="#2f2f33"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M96 137 h8 a4 4 0 0 1 -8 0 z" fill="#e58a9a" />
        </g>
      )}
    </svg>
  );
}
