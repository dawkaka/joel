import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full justify-between fixed top-0 left-0 z-10 border-b bg-white">
        <div className="c-container mx-auto flex items-center justify-between py-4">
          <h3 className="text-xl">Joel Pharmacy</h3>
          <ul className="flex items-center  justify-between gap-8 px-4 text-lg font-medium text-gray-50">
            <li>
              <Link to="/" className="text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sales" className="text-blue-500">
                Sales
              </Link>
            </li>
            <li>
              <Link to="/admin" className=" text-blue-500">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="c-container mx-auto py-4">{children}</div>
    </div>
  );
}
