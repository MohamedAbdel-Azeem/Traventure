import { useEffect, useState } from "react";
import axios from "axios";
import { useGetAdminRevenue } from "../../../../custom_hooks/Revenue/useGetAdminRevenue";
import RevenuesBarChart from "../../../../components/Revenues/RevenuesBarChart";

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
  console.log("revenue", revenue);
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
  const years = generateYearsArray();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <h1 className="font-sans text-xl font-medium">Admin Revenue Page</h1>
      <div className="flex flex-row items-center gap-8 pt-6">
        <select
          title="Year"
          className="px-4 py-3 border border-gray-300 rounded-lg"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="" disabled selected>
            Select Year
          </option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          title="Month"
          className="px-4 py-3 border border-gray-300 rounded-lg"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="" disabled selected>
            Select Month
          </option>
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
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
      <div>working on it</div>
    </div>
  );
}
