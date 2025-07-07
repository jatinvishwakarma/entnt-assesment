import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const defaultUsers = [
  {
    email: "admin@entnt.in",
    password: "admin123",
    role: "Admin"
  },
  {
    email: "jatin@entnt.in",
    password: "patient123",
    role: "Patient",
    patientId: "p1751928767845"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
    const session = localStorage.getItem("session");
    if (session) setUser(JSON.parse(session));
  }, []);

 const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const found = users.find(u => u.email === email && u.password === password);
  if (found) {
    setUser(found);
    localStorage.setItem("session", JSON.stringify(found));
    return found;
  }
  return null;
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);