import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <MainNav />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
