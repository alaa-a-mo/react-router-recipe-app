import { useOutletContext } from "react-router-dom";

export default function Ingredients() {
  const recipe = useOutletContext();

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-lg">
      <h2 className="text-xl font-bold text-gray-100 mb-6">
        What you'll need:
      </h2>
      <ul className="space-y-3 list-none p-0 m-0">
        {recipe.ingredients.map((ing, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <span className="h-2 w-2 rounded-full bg-indigo-500 mr-3 shrink-0"></span>
            <span>{ing}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
