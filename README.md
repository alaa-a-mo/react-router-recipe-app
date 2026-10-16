# Recipe Book (React Router practice project)

A small recipe app built to practice the **data router** features of React Router: loaders, actions, deferred data, nested routes, and pending UI. Recipes live in an in-memory array, so there is no backend and data resets on page refresh.

## Tech stack

- React (Vite)
- React Router (`createBrowserRouter` / `RouterProvider`)
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
├── main.jsx                 # App entry
├── App.jsx                  # Router definition (all routes live here)
├── data.js                  # In-memory recipe "database"
├── index.css                # Tailwind import + global styles
├── actions/
│   └── recipeAction.js      # newRecipeAction, deleteRecipeAction
├── loaders/
│   └── RecipeLoaders.js     # recipesLoader, recipeDetailLoader (500ms simulated delay)
├── components/
│   ├── MainNav.jsx          # Top navigation with NavLink
│   ├── Recipe.jsx           # Recipe card
│   └── LoadingSpinner.jsx   # Suspense fallback
└── pages/
    ├── RootLayout.jsx       # Shared layout with <Outlet />
    ├── ErrorPage.jsx        # errorElement (404 vs generic error)
    ├── RecipesPage.jsx      # List page
    ├── RecipeDetailsPage.jsx# Detail page, tabs, delete button
    ├── Ingredients.jsx      # Nested index route
    ├── Steps.jsx            # Nested route
    └── NewRecipe.jsx        # Form page
```

## Routes

| Path                       | Component                                   | Loader               | Action                        |
| -------------------------- | ------------------------------------------- | -------------------- | ----------------------------- |
| `/`                        | `RecipesPage` (index of `RootLayout`)       | `recipesLoader`      | none                          |
| `/recipes/new`             | `NewRecipe`                                 | none                 | `newRecipeAction` (create)    |
| `/recipes/:recipeId`       | `RecipeDetailsPage` + `Ingredients` (index) | `recipeDetailLoader` | `deleteRecipeAction` (delete) |
| `/recipes/:recipeId/steps` | `RecipeDetailsPage` + `Steps`               | inherited            | inherited                     |

## Concepts practiced

- **Data router setup**: `createBrowserRouter`, `RouterProvider`
- **Layout routes and nesting**: `RootLayout` with `<Outlet />`, index routes, pathless/grouped children (`recipes`)
- **Dynamic segments**: `:recipeId` and `params` in loaders/actions
- **Loaders**: fetching data before render, returning promises
- **Deferred data**: `<Suspense>` + `<Await>` with a loading fallback
- **Actions**: `<Form method="post">`, `request.formData()`, `redirect()` after success
- **Action feedback**: `useActionData` (validation errors), `useNavigation` (submitting state)
- **Fetchers**: `useFetcher` + `fetcher.Form method="delete"` for a mutation that doesn't navigate until the action redirects
- **Error handling**: `errorElement`, `useRouteError`, `isRouteErrorResponse`, throwing `Response` with a status
- **Navigation UI**: `NavLink` with `isActive` styling, `Link`
- **Sharing data with child routes**: `useOutletContext`

## Known limitations (by design)

- Data is stored in memory only; refreshing the page restores the original recipes.
- Loaders and the delete action include artificial delays so loading/pending states are visible. Remove them when you're done experimenting.

## Practice ideas (next steps)

1. **Edit recipe**: add `/recipes/:recipeId/edit` with its own loader and action. Reuse the form from `NewRecipe` and use a hidden `intent` field to tell create from update.
2. **Search and filter**: add a search box on the list page using `useSearchParams` and read `new URL(request.url).searchParams` inside `recipesLoader`. Use `<Form method="get">`.
3. **Favorites with optimistic UI**: a heart button using `useFetcher` that reads `fetcher.formData` to update instantly before the action finishes.
4. **Per-route error handling**: give the detail route its own `errorElement` and use `<Await errorElement={...}>` for deferred failures.
5. **`useRouteLoaderData`**: replace `useOutletContext` in `Ingredients`/`Steps` and compare the two approaches.
6. **Lazy routes**: use the `lazy` route property to code-split pages.
7. **Redirects and guards**: redirect from a loader (e.g. `/recipes` -> `/`) and build a fake "login required" check for `/recipes/new`.
8. **`useNavigate` and `useSubmit`**: add a back button, and auto-submit a filter form on change.
9. **`shouldRevalidate`**: control when the list loader re-runs after actions.
10. **Breadcrumbs with `handle` + `useMatches`**.
11. **Catch-all route** (`path: "*"`) for a custom 404.
