# Recipe Book (React Router practice project)

A small recipe app built to practice the **data router** features of React Router: loaders, actions, deferred data, nested routes, pending UI, and a simulated client-side authentication flow with protected routes. Recipes live in an in-memory array, so there is no backend and recipe data resets on page refresh.

> **Note:** authentication here is a front-end simulation for practice. See [Authentication](#authentication) and [Known limitations](#known-limitations-by-design).

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
├── main.jsx                  # App entry
├── App.jsx                   # Router definition (all routes live here)
├── data.js                   # In-memory recipe "database"
├── index.css                 # Tailwind import + global styles
├── actions/
│   ├── recipeAction.js       # newRecipeAction, deleteRecipeAction (both require auth)
│   └── authActions.js        # authAction (login + signup), logoutAction
├── loaders/
│   └── RecipeLoaders.js      # recipesLoader, recipeDetailLoader (500ms simulated delay)
├── utils/
│   ├── auth.js               # Token + accounts helpers, tokenLoader, requireAuth
│   └── NavLinkClasses.js     # Shared NavLink class builder
├── components/
│   ├── MainNav.jsx           # Top navigation, changes with login state
│   ├── AuthForm.jsx          # Login / signup form (mode from ?mode= query param)
│   ├── Recipe.jsx            # Recipe card
│   └── LoadingSpinner.jsx    # Suspense fallback
└── pages/
    ├── RootLayout.jsx        # Shared layout with <Outlet />
    ├── ErrorPage.jsx         # errorElement (404 vs generic error)
    ├── Authentication.jsx    # Page wrapper around AuthForm
    ├── RecipesPage.jsx       # List page
    ├── RecipeDetailsPage.jsx # Detail page, tabs, delete button (logged-in only)
    ├── Ingredients.jsx       # Nested index route
    ├── Steps.jsx             # Nested route
    └── NewRecipe.jsx         # Form page (protected)
```

## Routes

| Path                       | Component                                   | Loader               | Action                                   |
| -------------------------- | ------------------------------------------- | -------------------- | ---------------------------------------- |
| `/` (root layout)          | `RootLayout`                                | `tokenLoader`        | none                                     |
| `/` (index)                | `RecipesPage`                               | `recipesLoader`      | none                                     |
| `/auth?mode=login\|signup` | `AuthenticationPage` (`AuthForm`)           | none                 | `authAction` (login or signup)           |
| `/logout`                  | none                                        | redirects to `/`     | `logoutAction`                           |
| `/recipes/new`             | `NewRecipe` (**protected**)                 | `requireAuth`        | `newRecipeAction` (create)               |
| `/recipes/:recipeId`       | `RecipeDetailsPage` + `Ingredients` (index) | `recipeDetailLoader` | `deleteRecipeAction` (delete, protected) |
| `/recipes/:recipeId/steps` | `RecipeDetailsPage` + `Steps`               | inherited            | inherited                                |

The root route has `id: "root"` so any component can read its loader data (the auth token) with `useRouteLoaderData("root")`.

## Authentication

A simulated flow built entirely with data router features, no extra libraries:

- **Signup and login share one form.** `AuthForm` reads `?mode=login` or `?mode=signup` with `useSearchParams`; `authAction` reads the same param from `request.url`. A missing mode defaults to login in both places.
- **Accounts** are stored in `localStorage` under `accounts` (email + password). Emails are trimmed and lowercased. Signup requires a minimum password length, matching confirmation, and a unique email. Login returns the same generic error for an unknown email and a wrong password.
- **Session** is a random token stored in `localStorage` under `token`.
- **`tokenLoader`** runs on the root route and exposes the token. After any action (login, logout), React Router revalidates loaders, so the nav and the delete button update without manual state.
- **`requireAuth`** throws a `redirect` to `/auth?mode=login` when there is no token. It is used as the loader of `/recipes/new` and at the top of both recipe actions, so mutations are blocked even if the UI is bypassed.
- **UI follows login state**: logged-out users see only "Recipes" and "Login" in the nav and no delete button; logged-in users also see "Add New Recipe" and "Logout".

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
- **Route IDs and shared loader data**: `id: "root"` + `useRouteLoaderData`
- **Route protection**: throwing `redirect` from loaders and actions (`requireAuth`)
- **Query-param driven UI**: `useSearchParams` to switch between login and signup
- **Logout without a page**: a route with only an `action` and a redirecting `loader`

## Known limitations (by design)

- Recipe data is stored in memory only; refreshing the page restores the original recipes.
- **Authentication is not secure.** Passwords are stored in plain text in `localStorage`, and the token is a random string that is never validated by a server. Anyone can set a `token` in DevTools. Real authentication needs a backend that verifies credentials and issues signed tokens.
- Tokens never expire, and logging out in one tab does not update other open tabs.
- Recipes are not tied to users: any logged-in user can delete any recipe.
- Loaders and the delete action include artificial delays so loading/pending states are visible. Remove them when you're done experimenting.

## Practice ideas (next steps)

1. **Edit recipe**: add `/recipes/:recipeId/edit` with its own loader and action. Reuse the form from `NewRecipe` and use a hidden `intent` field to tell create from update.
2. **Search and filter**: add a search box on the list page using `useSearchParams` and read `new URL(request.url).searchParams` inside `recipesLoader`. Use `<Form method="get">`.
3. **Favorites with optimistic UI**: a heart button using `useFetcher` that reads `fetcher.formData` to update instantly before the action finishes.
4. **Per-route error handling**: give the detail route its own `errorElement` and use `<Await errorElement={...}>` for deferred failures.
5. **`useRouteLoaderData`** for recipes: replace `useOutletContext` in `Ingredients`/`Steps` and compare the two approaches.
6. **Lazy routes**: use the `lazy` route property to code-split pages.
7. **Return to the intended page after login**: have `requireAuth` redirect to `/auth?mode=login&redirectTo=...` and read it in `authAction`.
8. **Guard `/auth` for logged-in users**: add a loader that redirects to `/` when a token already exists.
9. **Token expiry**: store an expiration time with the token and treat expired tokens as logged out.
10. **Recipe ownership**: save the author's email on each recipe and only allow that user to delete it.
11. **`useNavigate` and `useSubmit`**: add a back button, and auto-submit a filter form on change.
12. **`shouldRevalidate`**: control when the list loader re-runs after actions.
13. **Breadcrumbs with `handle` + `useMatches`**.
14. **Catch-all route** (`path: "*"`) for a custom 404.
