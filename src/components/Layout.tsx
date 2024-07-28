import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context";
import { Config } from "./Config";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { hasSetup, isAdmin, storeName } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full justify-between fixed top-0 left-0 z-10 border-b bg-white">
        <div className="c-container mx-auto flex items-center justify-between py-4">
          <h3 className="text-2xl font-bold">{storeName}</h3>
          <ul className="flex items-center  justify-between gap-8 px-4 text-lg font-medium text-gray-50">
            <li>
              <Link
                to="/"
                className={`${
                  pathname === "/" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/sales"
                className={`${
                  pathname === "/sales" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                Sales
              </Link>
            </li>
            {!isAdmin ? (
              <li>
                <Link
                  to="/login"
                  className={`${
                    pathname === "/products" ? "text-blue-500" : "text-gray-700"
                  }`}
                >
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/admin"
                  className={`${
                    pathname === "/admin" ? "text-blue-500" : "text-gray-700"
                  }`}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="c-container mx-auto py-4">
        {hasSetup ? (
          children
        ) : (
          <div className="flex flex-col  w-[500px] mt-28 mx-auto rounded-lg border p-6">
            <Config />
          </div>
        )}
      </div>
    </div>
  );
}
