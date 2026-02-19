import { AdminHeader } from "../components/AdminHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backoffice - Le Seven",
  description: "Gestion des réservations",
  robots: "noindex, nofollow", // Ne pas indexer le backoffice
};

/**
 * Layout pour toutes les pages /admin (sauf login)
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
}
