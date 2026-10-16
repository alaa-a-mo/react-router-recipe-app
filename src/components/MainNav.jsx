import { NavLink } from "react-router-dom";
import { getNavLinkClass } from "../utils/NavLinkClasses";

export default function MainNav() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center space-x-2 sm:space-x-4 h-16 list-none m-0 p-0">
          <li>
            <NavLink to="/" end className={getNavLinkClass}>
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/recipes/new" className={getNavLinkClass}>
              Add New Recipe
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
