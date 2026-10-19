import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import { getNavLinkClass } from "../utils/NavLinkClasses";

export default function MainNav() {
  const token = useRouteLoaderData("root")?.token;

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center space-x-2 sm:space-x-4 h-16 list-none m-0 p-0">
          <li>
            <NavLink to="/" end className={getNavLinkClass}>
              Recipes
            </NavLink>
          </li>

          {token ? (
            <>
              <li>
                <NavLink to="/recipes/new" className={getNavLinkClass}>
                  Add New Recipe
                </NavLink>
              </li>
              <li>
                <Form action="/logout" method="post">
                  <button
                    type="submit"
                    className={`${getNavLinkClass({ isActive: false })} cursor-pointer`}
                  >
                    Logout
                  </button>
                </Form>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/auth?mode=login" className={getNavLinkClass}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
