import { Suspense } from "react";
import {
  Await,
  NavLink,
  Outlet,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { getNavLinkClass } from "../utils/NavLinkClasses";

export default function RecipeDetailsPage() {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";
  const { recipe } = useLoaderData();

  return (
    <Suspense fallback={<LoadingSpinner loadingTitle="recipe" />}>
      <Await resolve={recipe}>
        {(loadedRecipe) => (
          <div>
            <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
              {loadedRecipe.title}
            </h1>

            <div className="flex items-center justify-center space-x-2 sm:space-x-4 h-16 list-none m-0 p-0">
              <NavLink to="" end className={getNavLinkClass}>
                Ingredients
              </NavLink>
              <NavLink to="steps" className={getNavLinkClass}>
                Steps
              </NavLink>
            </div>
            <Outlet context={loadedRecipe} />
            <fetcher.Form
              method="delete"
              className="flex"
              onSubmit={(e) => {
                if (!window.confirm("Delete this recipe?")) e.preventDefault();
              }}
            >
              <button
                type="submit"
                disabled={isDeleting}
                className="cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 text-red-400 hover:text-red-300 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Recipe"}
              </button>
            </fetcher.Form>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
