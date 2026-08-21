import { Link } from "react-router-dom";

export default function Button({
  variant = "primary",
  size = "",
  to,
  children,
  type = "button",
  onClick,
}) {
  let classes = "btn btn-" + variant;

  if (size) {
    classes += " btn-" + size;
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
