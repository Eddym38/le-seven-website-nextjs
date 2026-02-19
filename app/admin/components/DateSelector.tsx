"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * Sélecteur de date simple
 */
export function DateSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDate =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    router.push(`/admin/calendar?date=${newDate}`);
  };

  const goToToday = () => {
    const today = new Date().toISOString().split("T")[0];
    router.push(`/admin/calendar?date=${today}`);
  };

  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    router.push(`/admin/calendar?date=${date.toISOString().split("T")[0]}`);
  };

  const goToNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    router.push(`/admin/calendar?date=${date.toISOString().split("T")[0]}`);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={goToPreviousDay}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium"
        >
          ← Jour précédent
        </button>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={goToNextDay}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium"
        >
          Jour suivant →
        </button>
      </div>

      <button
        onClick={goToToday}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
      >
        Aujourd'hui
      </button>
    </div>
  );
}
