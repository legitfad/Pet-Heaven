export default function PetAvatar({
  species = "cat",
  bg = "#fff2d6",
  name = "Pet",
}) {
  const icon = species === "cat" ? "🐱" : "🐶";

  return (
    <div className="pet-avatar" style={{ backgroundColor: bg }}>
      <span className="pet-avatar-icon">{icon}</span>
      <span className="pet-avatar-name">{name}</span>
    </div>
  );
}
