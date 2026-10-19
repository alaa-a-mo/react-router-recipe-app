import { redirect } from "react-router-dom";
import {
  getAccounts,
  saveAccounts,
  setAuthToken,
  removeAuthToken,
} from "../utils/auth";

const MIN_PASSWORD_LENGTH = 6;

export async function authAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw new Response("Invalid mode", { status: 422 });
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const accounts = getAccounts();
  const existingAccount = accounts.find((a) => a.email === email);

  if (mode === "signup") {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      };
    }
    if (password !== confirmPassword) {
      return { error: "Passwords do not match." };
    }
    if (existingAccount) {
      return { error: "Email already exists." };
    }
    saveAccounts([...accounts, { email, password }]);
    setAuthToken(crypto.randomUUID());
    return redirect("/");
  }

  if (!existingAccount || existingAccount.password !== password) {
    return { error: "Incorrect email or password." };
  }
  setAuthToken(crypto.randomUUID());
  return redirect("/");
}

export function logoutAction() {
  removeAuthToken();
  return redirect("/");
}
