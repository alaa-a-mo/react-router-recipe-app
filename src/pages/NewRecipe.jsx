import { useState } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const inputClass =
  "w-full bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all";

export default function NewRecipe() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [dismissedData, setDismissedData] = useState(null);
  const showError =
    actionData?.error && actionData !== dismissedData && !isSubmitting;

  return (
    <>
      {showError && (
        <p className="text-red-500 mb-4 font-medium">{actionData.error}</p>
      )}

      <Form
        method="post"
        className="space-y-6"
        onChange={() => setDismissedData(actionData)}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., Creamy Garlic Pasta"
            className={`${inputClass} px-4 py-2.5`}
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Image URL{" "}
            <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          <input
            type="url"
            id="image"
            name="image"
            placeholder="https://images.unsplash.com/..."
            className={`${inputClass} px-4 py-2.5`}
          />
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Ingredients{" "}
            <span className="text-gray-500 font-normal">
              (Enter each ingredient on a new line)
            </span>
          </label>
          <textarea
            rows="4"
            id="ingredients"
            name="ingredients"
            placeholder="200g Spaghetti&#10;2 cloves Garlic&#10;1 cup Heavy Cream"
            className={`${inputClass} p-4 resize-y`}
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="steps"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Preparation Steps{" "}
            <span className="text-gray-500 font-normal">
              (Enter each step on a new line)
            </span>
          </label>
          <textarea
            rows="5"
            id="steps"
            name="steps"
            placeholder="Boil salted water and cook pasta.&#10;Sauté garlic in olive oil.&#10;Mix everything together and serve."
            className={`${inputClass} p-4 resize-y`}
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors flex items-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer px-6 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Recipe"}
          </button>
        </div>
      </Form>
    </>
  );
}
