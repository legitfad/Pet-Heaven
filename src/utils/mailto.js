// ---------------------------------------------------------------------------
// mailto.js — send a form "to the administrator" without a backend server.
//
// The assignment says the forms should be "mailed to the administrator of the
// society". Since this is a frontend-only project (no server), we build a
// mailto: link. Opening it launches the visitor's own email program with the
// recipient, subject, and message body already filled in — they just press
// Send. This is a common, honest way to handle contact forms on a static site.
//
// (An alternative with no backend is a service such as EmailJS or Formspree,
//  which we mention in the Part B report but did not need here.)
// ---------------------------------------------------------------------------

// The society's administrator inbox. Change this to a real address if desired.
export const ADMIN_EMAIL = "admin@petheaven.org.sg";

// Turn a plain object of { Label: value } into a mailto: URL string.
export function buildMailto(subject, fields) {
  const lines = Object.keys(fields).map((label) => `${label}: ${fields[label]}`);
  const body = lines.join("\n");
  // encodeURIComponent keeps spaces, new lines and symbols valid inside a URL.
  return (
    "mailto:" +
    ADMIN_EMAIL +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body)
  );
}

// Convenience: build the link and ask the browser to open the email client.
export function sendMailto(subject, fields) {
  window.location.href = buildMailto(subject, fields);
}
