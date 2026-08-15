export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  as: Tag = "h2",
}) {
  return (
    <div className={"section-heading" + (center ? " center" : "")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag>{title}</Tag>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
