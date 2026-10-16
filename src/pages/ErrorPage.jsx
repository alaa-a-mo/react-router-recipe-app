import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import MainNav from "../components/MainNav";

export default function ErrorPage() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <MainNav />
      <div className="text-center py-16">
        <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
          {is404 ? "404" : "Something went wrong"}
        </h1>
        <p className="text-gray-400 mt-2">
          {is404 ? "Page not found" : "Please try again."}
        </p>
      </div>
    </div>
  );
}
