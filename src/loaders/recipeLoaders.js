import recipes from "../data";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function recipesLoader() {
  const recipesPromise = delay(500).then(() => recipes);
  return { recipes: recipesPromise };
}

export function recipeDetailLoader({ params }) {
  const recipe = recipes.find((r) => r.id === params.recipeId);

  if (!recipe) {
    throw new Response("Recipe Not Found", { status: 404 });
  }

  const recipePromise = delay(500).then(() => recipe);
  return { recipe: recipePromise };
}
