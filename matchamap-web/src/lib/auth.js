import { getUsers, saveUsers, setSessionUser } from "./storage";

function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function register({ email, password }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  const exists = users.some((user) => user.email === normalizedEmail);
  if (exists) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: createId("user"),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString()
  };

  saveUsers([...users, newUser]);
  const sessionUser = { id: newUser.id, email: newUser.email };
  setSessionUser(sessionUser);
  return sessionUser;
}

export function login({ email, password }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const found = users.find(
    (user) => user.email === normalizedEmail && user.password === password
  );

  if (!found) {
    throw new Error("Invalid email or password.");
  }

  const sessionUser = { id: found.id, email: found.email };
  setSessionUser(sessionUser);
  return sessionUser;
}
