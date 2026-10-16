import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import Ingredients from "./pages/Ingredients";
import Steps from "./pages/Steps";
import NewRecipe from "./pages/NewRecipe";
import { recipeDetailLoader, recipesLoader } from "./loaders/RecipeLoaders";
import { newRecipeAction, deleteRecipeAction } from "./actions/recipeAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
        loader: recipesLoader,
      },
      {
        path: "recipes",
        children: [
          {
            path: "new",
            element: <NewRecipe />,
            action: newRecipeAction,
          },
          {
            path: ":recipeId",
            element: <RecipeDetailsPage />,
            loader: recipeDetailLoader,
            action: deleteRecipeAction,
            children: [
              { index: true, element: <Ingredients /> },
              { path: "steps", element: <Steps /> },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
