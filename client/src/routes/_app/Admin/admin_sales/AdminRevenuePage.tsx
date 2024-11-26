import React, { useState, useEffect } from "react";
import { useGetAdminRevenue } from "../../../../custom_hooks/Revenue/useGetAdminRevenue"; // Adjust the import path as needed
import RevenuesBarChart from "../../../../components/Revenues/RevenuesBarChart"; // Adjust the import path as needed
interface Revenue {
  activityRevenues: activityRevenue[];
  itineraryRevenues: itineraryRevenue[];
}
interface activityRevenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}
interface itineraryRevenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}
// Function to generate an array of years from 2024 to the current year
const generateYearsArray = (): number[] => {
  const currentYear = 2026;
  const startYear = 2024;
  const yearsArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push(year);
  }

  return yearsArray;
};

export function AdminRevenuePage() {
  const { revenue, loading, error } = useGetAdminRevenue();

  const years = generateYearsArray();
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const months = [
    "ALL",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    if (!revenue) return;
    const filteredActivityRevenues = revenue.activityRevenues.filter((rev) => {
      const yearMatch = rev.year.toString() === selectedYear;
      const monthMatch =
        selectedMonth === "ALL" || rev.month === months.indexOf(selectedMonth);
      return yearMatch && monthMatch;
    });

    const filteredItineraryRevenues = revenue.itineraryRevenues.filter(
      (rev) => {
        const yearMatch = rev.year.toString() === selectedYear;
        const monthMatch =
          selectedMonth === "ALL" ||
          rev.month === months.indexOf(selectedMonth);
        return yearMatch && monthMatch;
      }
    );

    const filteredProductRevenues = revenue.productRevenues.filter((rev) => {
      const yearMatch = rev.year.toString() === selectedYear;
      const monthMatch =
        selectedMonth === "ALL" || rev.month === months.indexOf(selectedMonth);
      return yearMatch && monthMatch;
    });
    const totalActivityRevenue = filteredActivityRevenues.reduce(
      (acc, rev) => acc + rev.revenue,
      0
    );
    const totalItineraryRevenue = filteredItineraryRevenues.reduce(
      (acc, rev) => acc + rev.revenue,
      0
    );
    const totalProductRevenue = filteredProductRevenues.reduce(
      (acc, rev) => acc + rev.revenue,
      0
    );
    setTotalRevenue(
      totalActivityRevenue + totalItineraryRevenue + totalProductRevenue
    );
  }, [revenue, selectedYear, selectedMonth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    revenue && (
      <div className="flex flex-col items-center gap-8 pt-6">
        <h1 className="font-sans text-xl font-medium">Admin Revenue Page</h1>
        <div className="flex gap-4">
          <select
            className="p-2 border rounded"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <RevenuesBarChart
          activityRevenues={revenue.activityRevenues || []}
          itineraryRevenues={revenue.itineraryRevenues || []}
          productRevenues={revenue.productRevenues || []}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
        <div className="mt-8 flex justify-center items-center bg-purple-50 py-3 px-4 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <label className="text-xl font-semibold text-purple-700">
                Total Revenue:
              </label>
              <p className="text-4xl font-bold text-purple-900">
                EGP {totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
