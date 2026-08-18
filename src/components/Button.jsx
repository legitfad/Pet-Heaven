import { Link } from "react-router-dom";

export default function Button({
  variant = "primary",
  size = "",
  to,
  href,
  children,
  className = "",
  type = "button",
  onClick,
}) {
  let classes = "btn btn-" + variant;

  if (size) {
    classes += " btn-" + size;
  }

  if (className) {
    classes += " " + className;
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
