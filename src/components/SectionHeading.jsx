// ---------------------------------------------------------------------------
// SectionHeading — a small reusable title block for the top of a page section.
// It shows an optional little "eyebrow" label, the main heading, and an
// optional subtitle. Reusing it keeps every section's heading style consistent.
//
// `as` lets the caller choose the heading level (h1 for a page title, h2 for a
// section) which is good for accessibility and document structure.
// ---------------------------------------------------------------------------
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
