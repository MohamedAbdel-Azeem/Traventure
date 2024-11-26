import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

interface Revenue {
  year: number;
  month: number;
  day: number;
  revenue: number;
}

interface RevenuesBarChartProps {
  activityRevenues: Revenue[];
  itineraryRevenues: Revenue[];
  productRevenues: Revenue[];
  selectedYear: string;
  selectedMonth: string;
}

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

const RevenuesBarChart: React.FC<RevenuesBarChartProps> = ({
  activityRevenues,
  itineraryRevenues,
  productRevenues,
  selectedYear,
  selectedMonth,
}) => {
  // Filter revenue data based on selected year and month
  const filteredActivityRevenues = activityRevenues.filter((rev) => {
    const yearMatch = rev.year.toString() === selectedYear;
    const monthMatch =
      selectedMonth === "ALL" || rev.month === months.indexOf(selectedMonth);
    return yearMatch && monthMatch;
  });

  const filteredItineraryRevenues = itineraryRevenues.filter((rev) => {
    const yearMatch = rev.year.toString() === selectedYear;
    const monthMatch =
      selectedMonth === "ALL" || rev.month === months.indexOf(selectedMonth);
    return yearMatch && monthMatch;
  });
  const filteredProductRevenues = productRevenues.filter((rev) => {
    const yearMatch = rev.year.toString() === selectedYear;
    const monthMatch =
      selectedMonth === "ALL" || rev.month === months.indexOf(selectedMonth);
    return yearMatch && monthMatch;
  });
  // Combine the filtered data for the chart
  const combinedDataMap = new Map<string, any>();

  filteredActivityRevenues.forEach((activityRev) => {
    const key =
      selectedMonth === "ALL"
        ? `${activityRev.year}-${activityRev.month}`
        : `${activityRev.year}-${activityRev.month}-${activityRev.day}`;

    if (!combinedDataMap.has(key)) {
      combinedDataMap.set(key, {
        year: activityRev.year,
        month: activityRev.month,
        day: activityRev.day,
        activityRevenue: 0,
        itineraryRevenue: 0,
        productRevenue: 0,
      });
    }

    const existingData = combinedDataMap.get(key);
    existingData.activityRevenue += activityRev.revenue;
    combinedDataMap.set(key, existingData);
  });

  filteredItineraryRevenues.forEach((itineraryRev) => {
    const key =
      selectedMonth === "ALL"
        ? `${itineraryRev.year}-${itineraryRev.month}`
        : `${itineraryRev.year}-${itineraryRev.month}-${itineraryRev.day}`;

    if (!combinedDataMap.has(key)) {
      combinedDataMap.set(key, {
        year: itineraryRev.year,
        month: itineraryRev.month,
        day: itineraryRev.day,
        activityRevenue: 0,
        itineraryRevenue: 0,
        productRevenue: 0,
      });
    }

    const existingData = combinedDataMap.get(key);
    existingData.itineraryRevenue += itineraryRev.revenue;
    combinedDataMap.set(key, existingData);
  });

  filteredProductRevenues.forEach((produtctRev) => {
    const key =
      selectedMonth === "ALL"
        ? `${produtctRev.year}-${produtctRev.month}`
        : `${produtctRev.year}-${produtctRev.month}-${produtctRev.day}`;

    if (!combinedDataMap.has(key)) {
      combinedDataMap.set(key, {
        year: produtctRev.year,
        month: produtctRev.month,
        day: produtctRev.day,
        activityRevenue: 0,
        itineraryRevenue: 0,
        productRevenue: 0,
      });
    }

    const existingData = combinedDataMap.get(key);
    existingData.productRevenue += produtctRev.revenue;
    combinedDataMap.set(key, existingData);
  });

  // Convert the map to an array and sort it
  const combinedData = Array.from(combinedDataMap.values()).sort((a, b) => {
    if (selectedMonth === "ALL") {
      return a.month - b.month || a.year - b.year;
    } else {
      return a.day - b.day || a.month - b.month || a.year - b.year;
    }
  });

  // Determine the XAxis data key based on the selected month
  const xAxisDataKey = selectedMonth === "ALL" ? "month" : "day";

  return (
    <div>
      <h2 className="font-sans text-lg font-medium">Revenue</h2>
      <BarChart width={600} height={300} data={combinedData}>
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
        <Bar dataKey="activityRevenue" fill="#8884d8" name="Activity Revenue" />
        <Bar
          dataKey="itineraryRevenue"
          fill="#82ca9d"
          name="Itinerary Revenue"
        />
        <Bar dataKey="productRevenue" fill="#883433" name="Product Revenue" />
      </BarChart>
    </div>
  );
};

export default RevenuesBarChart;
