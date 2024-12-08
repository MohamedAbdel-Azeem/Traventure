import React, { useState, useEffect } from "react";
import { useGetAdminRevenue } from "../../../../custom_hooks/Revenue/useGetAdminRevenue"; // Adjust the import path as needed
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../../../../custom_hooks/auth";
import { useParams } from "react-router-dom";

interface Revenue {
  activityRevenues: activityRevenue[];
  itineraryRevenues: itineraryRevenue[];
  productRevenues: productRevenue[];
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
interface productRevenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}

// Function to generate an array of years from 2024 to the current year
const generateYearsArray = (): number[] => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  const yearsArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push(year);
  }

  return yearsArray;
};

// Transform revenues into unified chart data
const prepareChartData = (
  activityRevenues: activityRevenue[],
  itineraryRevenues: itineraryRevenue[],
  productRevenues: productRevenue[],
  selectedYear: string,
  selectedMonth: string
) => {
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

  // Filter revenues based on selected year and month
  const filteredRevenues = (revenues: any[]) =>
    revenues.filter((rev) => rev.year.toString() === selectedYear);

  const activityFiltered = filteredRevenues(activityRevenues);
  const itineraryFiltered = filteredRevenues(itineraryRevenues);
  const productFiltered = filteredRevenues(productRevenues);

  const combinedData = [];

  if (selectedMonth === "ALL") {
    // Aggregate by month
    for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
      const activityRevenue = activityFiltered
        .filter((rev) => rev.month === monthIndex)
        .reduce((sum, rev) => sum + rev.revenue, 0);
      const itineraryRevenue = itineraryFiltered
        .filter((rev) => rev.month === monthIndex)
        .reduce((sum, rev) => sum + rev.revenue, 0);
      const productRevenue = productFiltered
        .filter((rev) => rev.month === monthIndex)
        .reduce((sum, rev) => sum + rev.revenue, 0);

      combinedData.push({
        month: monthIndex,
        activityRevenue,
        itineraryRevenue,
        productRevenue,
      });
    }
  } else {
    // Aggregate by day for a specific month
    const maxDaysInMonth = new Date(
      parseInt(selectedYear),
      months.indexOf(selectedMonth),
      0
    ).getDate();

    for (let day = 1; day <= maxDaysInMonth; day++) {
      combinedData.push({
        day,
        activityRevenue:
          activityFiltered.find(
            (rev) =>
              rev.day === day && rev.month === months.indexOf(selectedMonth)
          )?.revenue || 0,
        itineraryRevenue:
          itineraryFiltered.find(
            (rev) =>
              rev.day === day && rev.month === months.indexOf(selectedMonth)
          )?.revenue || 0,
        productRevenue:
          productFiltered.find(
            (rev) =>
              rev.day === day && rev.month === months.indexOf(selectedMonth)
          )?.revenue || 0,
      });
    }
  }

  return combinedData;
};

export function AdminRevenuePage() {
  const { isAuthenticated, isLoading, isError } = useAuth(3);
  const { username } = useParams<{ username: string }>();
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

  const [chartData, setChartData] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [showActivities, setShowActivities] = useState<boolean>(true);
  const [showItinerary, setShowItinerary] = useState<boolean>(true);
  useEffect(() => {
    if (!revenue) return;

    const data = prepareChartData(
      revenue.activityRevenues,
      revenue.itineraryRevenues,
      revenue.productRevenues,
      selectedYear,
      selectedMonth
    );

    setChartData(data);

    const totalActivityRevenue = data.reduce(
      (acc, rev) => acc + rev.activityRevenue,
      0
    );
    const totalItineraryRevenue = data.reduce(
      (acc, rev) => acc + rev.itineraryRevenue,
      0
    );
    const totalProductRevenue = data.reduce(
      (acc, rev) => acc + rev.productRevenue,
      0
    );
    let total = 0;
    if (showActivities) total += totalActivityRevenue;
    if (showItinerary) total += totalItineraryRevenue;
    if (showProducts) total += totalProductRevenue;
    setTotalRevenue(total);
  }, [
    revenue,
    selectedYear,
    selectedMonth,
    showProducts,
    showActivities,
    showItinerary,
  ]);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#f86c6b" loading={true} size={150} />
      </div>
    );
  }
  if (isError || isAuthenticated !== username) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Error 403 Unauthorized access</h1>
      </div>
    );
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const xAxisDataKey = selectedMonth === "ALL" ? "month" : "day";
  console.log("revenue", chartData);
  return (
    revenue && (
      <div className="flex flex-col items-center gap-2 pt-6">
        <h1 className="font-sans text-xl font-medium p-5">
          Admin Revenue Page
        </h1>
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
          <label>
            <input
              type="checkbox"
              checked={showProducts}
              onChange={() => setShowProducts((prev) => !prev)}
            />
            Show Products Revenue
          </label>
          <label>
            <input
              type="checkbox"
              checked={showActivities}
              onChange={() => setShowActivities((prev) => !prev)}
            />
            Show Activities Revenue
          </label>
          <label>
            <input
              type="checkbox"
              checked={showItinerary}
              onChange={() => setShowItinerary((prev) => !prev)}
            />
            Show Itinerary Revenue
          </label>
        </div>
        <div className="flex flex-row">
          <LineChart
            width={800}
            height={400}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisDataKey}
              tickFormatter={(tick) =>
                xAxisDataKey === "month" ? months[tick] : tick
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />

            {showActivities && (
              <Line
                type="monotone"
                dataKey="activityRevenue"
                name="Activity Revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            )}
            {showItinerary && (
              <Line
                type="monotone"
                dataKey="itineraryRevenue"
                name="Itinerary Revenue"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            )}
            {showProducts && (
              <Line
                type="monotone"
                dataKey="productRevenue"
                name="Product Revenue"
                stroke="#ffc658"
                activeDot={{ r: 8 }}
              />
            )}
          </LineChart>
          <div className="mt-8 flex justify-center items-center bg-purple-50 py-3 px-4 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto h-1/4">
            <div className="flex items-center space-x-4">
              <div className=" items-center">
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
      </div>
    )
  );
}
