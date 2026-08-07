// ---------------------------------------------------------------------------
// validators.js — small reusable validation helpers.
//
// Each function checks ONE value and returns an error message string, or an
// empty string "" when the value is fine. Because every form shares these same
// helpers, our validation rules stay consistent across the whole site.
// (We validate by hand instead of using a library, so the logic is easy to
//  read and explain.)
// ---------------------------------------------------------------------------

// The field must not be blank.
export function required(value) {
  return String(value).trim() === "" ? "This field is required." : "";
}

// The field must look like an email address:  name@example.com
export function isEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(value).trim())
    ? ""
    : "Please enter a valid email address.";
}

// The field must contain a sensible phone number (at least 8 digits).
export function isPhone(value) {
  const digits = String(value).replace(/\D/g, ""); // keep digits only
  return digits.length >= 8
    ? ""
    : "Please enter a valid phone number (at least 8 digits).";
}

// The field must have at least n characters.
export function minLength(value, n) {
  return String(value).trim().length >= n
    ? ""
    : `Please enter at least ${n} characters.`;
}

// Two fields must match (used for "confirm password").
export function mustMatch(value, other, label = "Values") {
  return value === other ? "" : `${label} do not match.`;
}
