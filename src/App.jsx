import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import Ingredients from "./pages/Ingredients";
import Steps from "./pages/Steps";
import NewRecipe from "./pages/NewRecipe";
import { authAction, logoutAction } from "./actions/authActions";
import { recipeDetailLoader, recipesLoader } from "./loaders/RecipeLoaders";
import { newRecipeAction, deleteRecipeAction } from "./actions/recipeAction";
import { requireAuth, tokenLoader } from "./utils/auth";
import AuthenticationPage from "./pages/Authentication";
import { authLoader } from "./loaders/authLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <RecipesPage />,
        loader: recipesLoader,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
        loader: authLoader,
      },
      {
        path: "logout",
        action: logoutAction,
        loader: () => redirect("/"),
      },
      {
        path: "recipes",
        children: [
          {
            path: "new",
            element: <NewRecipe />,
            action: newRecipeAction,
            loader: requireAuth,
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
