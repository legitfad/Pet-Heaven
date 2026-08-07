import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// useLocalStorage — a REUSABLE custom React hook.
//
// It works just like React's built-in useState, but it also remembers the
// value in the browser's localStorage, so it survives a page refresh.
//
// localStorage can only store plain text, so we:
//   - JSON.stringify(...) the value before saving it, and
//   - JSON.parse(...) it back into a real object when reading it.
//
// Usage:  const [members, setMembers] = useLocalStorage("petHavenMembers", []);
// ---------------------------------------------------------------------------
export function useLocalStorage(key, initialValue) {
  // Read the saved value once, when the component first loads.
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      // If parsing fails (or storage is blocked) fall back to the default.
      return initialValue;
    }
  });

  // Whenever the value changes, write it back to localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write errors (e.g. private browsing with storage disabled).
    }
  }, [key, value]);

  return [value, setValue];
}
