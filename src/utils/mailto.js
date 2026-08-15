export const ADMIN_EMAIL = "admin@petheaven.org.sg";

export function buildMailto(subject, fields) {
  const lines = Object.keys(fields).map((label) => `${label}: ${fields[label]}`);
  const body = lines.join("\n");

  return (
    "mailto:" +
    ADMIN_EMAIL +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body)
  );
}

export function sendMailto(subject, fields) {
  window.location.href = buildMailto(subject, fields);
}
