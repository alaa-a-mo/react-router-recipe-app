import { useOutletContext } from "react-router-dom";

export default function Steps() {
  const recipe = useOutletContext();

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-lg">
      <h2 className="text-xl font-bold text-gray-100 mb-6">
        Preparation Steps:
      </h2>
      <ol className="space-y-6 list-none p-0 m-0">
        {recipe.steps.map((step, index) => (
          <li key={index} className="flex items-start text-gray-300">
            <span className="mr-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <span className="pt-0.5 text-start">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
