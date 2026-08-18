import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const MemberContext = createContext(null);
const EMPLOYEE_DOMAIN = "@petheaven.org.sg";

export function MemberProvider({ children }) {
  const [members, setMembers] = useLocalStorage("petHavenMembers", []);
  const [currentMember, setCurrentMember] = useLocalStorage(
    "petHavenCurrentMember",
    null
  );

  function register(newMember) {
    let alreadyExists = false;

    for (let i = 0; i < members.length; i++) {
      if (members[i].email.toLowerCase() === newMember.email.toLowerCase()) {
        alreadyExists = true;
      }
    }

    if (alreadyExists) {
      return { ok: false, error: "An account with that email already exists." };
    }

    const updatedMembers = members.concat(newMember);
    setMembers(updatedMembers);
    setCurrentMember(newMember);
    return { ok: true };
  }

  function login(email, password) {
    const emailText = email.toLowerCase();

    const domainStart = emailText.length - EMPLOYEE_DOMAIN.length;

    if (emailText.substring(domainStart) === EMPLOYEE_DOMAIN) {
      const employee = {
        name: "Employee",
        email,
        password,
        role: "employee",
      };

      setCurrentMember(employee);
      return { ok: true, member: employee };
    }

    let found = null;

    for (let i = 0; i < members.length; i++) {
      if (
        members[i].email.toLowerCase() === emailText &&
        members[i].password === password
      ) {
        found = members[i];
      }
    }

    if (!found) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    setCurrentMember(found);
    return { ok: true, member: found };
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
