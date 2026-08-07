import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

// ---------------------------------------------------------------------------
// MemberContext — shares the "who is signed in" state with the whole app.
//
// React Context lets any component read the current member or call
// register / login / logout, WITHOUT passing props down through every layer.
// This is a clean, reusable way to manage app-wide state.
//
// IMPORTANT (honesty note): this is a classroom demo of membership, NOT real
// security. Member details — including the password — are stored as plain text
// in the browser's localStorage. A real website would send them to a server
// over HTTPS and store only a safely *hashed* password.
// ---------------------------------------------------------------------------

const MemberContext = createContext(null);

export function MemberProvider({ children }) {
  // The full list of registered members, and who is currently logged in.
  // useLocalStorage keeps both saved across page refreshes.
  const [members, setMembers] = useLocalStorage("petHavenMembers", []);
  const [currentMember, setCurrentMember] = useLocalStorage(
    "petHavenCurrentMember",
    null
  );

  // Create a new member account. Returns { ok, error }.
  function register(newMember) {
    const alreadyExists = members.some(
      (m) => m.email.toLowerCase() === newMember.email.toLowerCase()
    );
    if (alreadyExists) {
      return { ok: false, error: "An account with that email already exists." };
    }
    setMembers([...members, newMember]);
    setCurrentMember(newMember); // sign them in straight away
    return { ok: true };
  }

  // Sign in an existing member. Returns { ok, error }.
  function login(email, password) {
    const found = members.find(
      (m) =>
        m.email.toLowerCase() === email.toLowerCase() && m.password === password
    );
    if (!found) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    setCurrentMember(found);
    return { ok: true };
  }

  // Sign out.
  function logout() {
    setCurrentMember(null);
  }

  const value = { members, currentMember, register, login, logout };

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
}

// A tiny helper hook so components can simply write:
//   const { currentMember, logout } = useMember();
export function useMember() {
  return useContext(MemberContext);
}
