import { Await, useLoaderData } from "react-router-dom";
import Recipe from "../components/Recipe";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RecipesPage() {
  const { recipes } = useLoaderData();
  return (
    <Suspense fallback={<LoadingSpinner loadingTitle="recipes" />}>
      <Await resolve={recipes}>
        {(loadedRecipes) => (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
                  Explore Recipes
                </h1>
                <p className="text-gray-400 mt-2">
                  Discover delicious homemade dishes with complete ingredients
                  and easy-to-follow steps.
                </p>
              </div>
              {loadedRecipes.length === 0 ? (
                <p>No recipes found</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none p-0 m-0">
                  {loadedRecipes.map((recipe) => (
                    <Recipe recipe={recipe} key={recipe.id} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
