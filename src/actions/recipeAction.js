import { redirect } from "react-router-dom";
import recipes from "../data";

const PLACEHOLDER_IMAGE = "https://placehold.co/800x600?text=No+Image";

const splitLines = (text) =>
  String(text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

export async function newRecipeAction({ request }) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const ingredientsArray = splitLines(formData.get("ingredients"));
  const stepsArray = splitLines(formData.get("steps"));

  if (!title || ingredientsArray.length === 0 || stepsArray.length === 0) {
    return { error: "Please fill in all required fields" };
  }

  const recipe = {
    id: crypto.randomUUID(),
    title,
    image: image || PLACEHOLDER_IMAGE,
    ingredients: ingredientsArray,
    steps: stepsArray,
  };
  recipes.push(recipe);
  return redirect(`/recipes/${recipe.id}`);
}

export async function deleteRecipeAction({ params }) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const recipeIndex = recipes.findIndex((r) => r.id === params.recipeId);

  if (recipeIndex === -1) {
    throw new Response("Recipe Not Found", { status: 404 });
  }

  recipes.splice(recipeIndex, 1);

  return redirect("/");
}
