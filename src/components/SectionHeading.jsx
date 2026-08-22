export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  className = "",
  as: Tag = "h2",
}) {
  const classes =
    "section-heading" +
    (center ? " center" : "") +
    (className ? " " + className : "");

  return (
    <div className={classes}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag>{title}</Tag>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
