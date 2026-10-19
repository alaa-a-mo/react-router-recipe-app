import { redirect } from "react-router-dom";

export function authLoader({ request }) {
  const mode = new URL(request.url).searchParams.get("mode");
  if (mode !== "login" && mode !== "signup") {
    return redirect("/auth?mode=login");
  }
  return null;
}
