export function required(value) {
  return String(value).trim() === "" ? "This field is required." : "";
}

export function isEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(value).trim())
    ? ""
    : "Please enter a valid email address.";
}

export function isPhone(value) {
  const digits = String(value).replace(/\D/g, "");
  return digits.length >= 8
    ? ""
    : "Please enter a valid phone number (at least 8 digits).";
}

export function minLength(value, n) {
  return String(value).trim().length >= n
    ? ""
    : `Please enter at least ${n} characters.`;
}

export function mustMatch(value, other, label = "Values") {
  return value === other ? "" : `${label} do not match.`;
}
