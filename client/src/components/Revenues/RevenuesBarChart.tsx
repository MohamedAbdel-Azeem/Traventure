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
  Revenues: Revenue[];
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
  Revenues,

  selectedYear,
  selectedMonth,
}) => {
  // Filter revenue data based on selected year and month
  const filteredRevenues = Revenues.filter((rev) => {
    const yearMatch = rev.year.toString() === selectedYear;
    const monthMatch =
      selectedMonth === "ALL" || rev.month === months.indexOf(selectedMonth);
    return yearMatch && monthMatch;
  });

  // Combine the filtered data for the chart
  const combinedDataMap = new Map<string, any>();

  filteredRevenues.forEach((rev) => {
    const key =
      selectedMonth === "ALL"
        ? `${rev.year}-${rev.month}`
        : `${rev.year}-${rev.month}-${rev.day}`;

    if (!combinedDataMap.has(key)) {
      combinedDataMap.set(key, {
        year: rev.year,
        month: rev.month,
        day: rev.day,
        revenue: 0,
      });
    }

    const existingData = combinedDataMap.get(key);
    existingData.revenue += rev.revenue;
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
        <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
      </BarChart>
    </div>
  );
};

export default RevenuesBarChart;
