import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import RecipesPage from "./pages/RecipesPage";
import Ingredients from "./pages/Ingredients";
import Steps from "./pages/Steps";
import { logoutAction } from "./actions/authActions";
import { recipesLoader } from "./loaders/recipeLoaders";
import { tokenLoader } from "./utils/auth";

const NewRecipe = lazy(() => import("./pages/NewRecipe"));
const AuthenticationPage = lazy(() => import("./pages/Authentication"));
const RecipeDetailsPage = lazy(() => import("./pages/RecipeDetailsPage"));

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthenticationPage />
          </Suspense>
        ),
        action: ({ request }) =>
          import("./actions/authActions").then((module) =>
            module.authAction({ request }),
          ),
        loader: ({ request }) =>
          import("./loaders/authLoader").then((module) =>
            module.authLoader({ request }),
          ),
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
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <NewRecipe />
              </Suspense>
            ),
            action: ({ request }) =>
              import("./actions/recipeAction").then((module) =>
                module.newRecipeAction({ request }),
              ),
            loader: () =>
              import("./utils/auth").then((module) => module.requireAuth()),
          },
          {
            path: ":recipeId",
            element: (
              <Suspense fallback={null}>
                <RecipeDetailsPage />
              </Suspense>
            ),
            loader: ({ params }) =>
              import("./loaders/recipeLoaders").then((module) =>
                module.recipeDetailLoader({ params }),
              ),
            action: ({ params }) =>
              import("./actions/recipeAction").then((module) =>
                module.deleteRecipeAction({ params }),
              ),
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
