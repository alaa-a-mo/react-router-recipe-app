import { Link } from "react-router-dom";

export default function Recipe({ recipe }) {
  return (
    <li className="flex">
      <Link
        to={`/recipes/${recipe.id}`}
        className="group flex flex-col bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 w-full"
      >
        <div className="relative h-48 w-full overflow-hidden bg-gray-800">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div className="p-5 flex flex-col flex-1 justify-between">
          <h2 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
            {recipe.title}
          </h2>
          <div className="mt-4 flex items-center text-sm font-medium text-indigo-400">
            View Recipe
            <span className="ml-1.5 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
