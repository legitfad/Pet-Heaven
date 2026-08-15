import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const MemberContext = createContext(null);

export function MemberProvider({ children }) {
  const [members, setMembers] = useLocalStorage("petHavenMembers", []);
  const [currentMember, setCurrentMember] = useLocalStorage(
    "petHavenCurrentMember",
    null
  );

  function register(newMember) {
    const alreadyExists = members.some(
      (m) => m.email.toLowerCase() === newMember.email.toLowerCase()
    );
    if (alreadyExists) {
      return { ok: false, error: "An account with that email already exists." };
    }
    setMembers([...members, newMember]);
    setCurrentMember(newMember);
    return { ok: true };
  }

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

  function logout() {
    setCurrentMember(null);
  }

  const value = { members, currentMember, register, login, logout };

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
}

export function useMember() {
  return useContext(MemberContext);
}
