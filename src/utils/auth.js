import { redirect } from "react-router-dom";
const ACCOUNTS_KEY = "accounts";

export function getAuthToken() {
  return localStorage.getItem("token");
}
export function setAuthToken(token) {
  localStorage.setItem("token", token);
}

export function removeAuthToken() {
  localStorage.removeItem("token");
}

export function tokenLoader() {
  const token = getAuthToken();
  return { token };
}

export function requireAuth() {
  const token = getAuthToken();
  if (!token) {
    throw redirect("/auth?mode=login");
  }
  return null;
}
export function getAccounts() {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

export function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}
