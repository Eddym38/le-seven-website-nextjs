"use client";

import { signOut } from "../login/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header du backoffice avec navigation et déconnexion
 */
export function AdminHeader() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      await signOut();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900">
              Backoffice Le Seven
            </h1>

            <nav className="flex gap-4">
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/admin"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/calendar"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/admin/calendar"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Calendrier
              </Link>
            </nav>
          </div>

          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </header>
  );
}
