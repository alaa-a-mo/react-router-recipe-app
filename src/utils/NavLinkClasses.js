export const getNavLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
      : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }`;
