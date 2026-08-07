import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// Button — one reusable button used everywhere, so all buttons look the same.
//
// It is clever about WHAT it renders:
//   - if you pass `to`   -> it becomes a router <Link> (moves between pages)
//   - if you pass `href` -> it becomes an <a> (for external / mailto links)
//   - otherwise          -> it becomes a real <button> (for form submits etc.)
//
// `variant` picks the colour style: "primary", "secondary" or "ghost".
// Any other props (onClick, type, disabled...) are passed straight through.
// ---------------------------------------------------------------------------
export default function Button({
  variant = "primary",
  size = "",
  to,
  href,
  children,
  className = "",
  ...rest
}) {
  const classes = ["btn", `btn-${variant}`, size ? `btn-${size}` : "", className]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
