import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { set } from "date-fns";

interface Count {
  year: number;
  month: number;
  day: number;
  type: string;
  count: number;
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

export function AdminUsersNumPage() {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [counts, setCounts] = useState<Count[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [lineVisibility, setLineVisibility] = useState<{
    [key: string]: boolean;
  }>({}); // Track visibility of each line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "/traventure/api/admin/numberofusers",
          {
            params: {
              year: selectedYear,
              month:
                selectedMonth !== "ALL" ? months.indexOf(selectedMonth) : null,
            },
          }
        );
        console.log(data);
        setCounts(data.userCounts);
        setTotalNum(data.totalUsers);
        // Initialize line visibility for each type
        const types: string[] = Array.from(
          new Set(data.userCounts.map((user: Count) => user.type))
        );
        setLineVisibility(
          types.reduce<{ [key: string]: boolean }>(
            (acc, type) => ({ ...acc, [type]: true }),
            {}
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);

  const groupedData = counts.reduce((acc: { [key: string]: Count[] }, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const xAxisDataKey = selectedMonth === "ALL" ? "month" : "day";

  // Create a unified timeline for x-axis (months or days)
  const unifiedTimeline =
    selectedMonth === "ALL"
      ? Array.from({ length: 12 }, (_, i) => ({ month: i + 1 })) // Months 1-12
      : Array.from(
          {
            length: new Date(
              parseInt(selectedYear),
              months.indexOf(selectedMonth),
              0
            ).getDate(),
          },
          (_, i) => ({ day: i + 1 }) // Days 1-N
        );

  // Merge grouped data into the unified timeline for each type
  // Merge grouped data into the unified timeline for all types
  const preparedData = unifiedTimeline.map((entry) => {
    const newEntry: { [key: string]: any } = { ...entry }; // Include x-axis key (month/day)
    Object.keys(groupedData).forEach((type) => {
      const existingData = groupedData[type].find(
        (item) =>
          (xAxisDataKey === "month" &&
            "month" in entry &&
            item.month === entry.month) ||
          (xAxisDataKey === "day" && "day" in entry && item.day === entry.day)
      );
      newEntry[type] = existingData ? existingData.count : 0; // Add count for this type
    });
    return newEntry;
  });

  const handleCheckboxChange = (type: string) => {
    setLineVisibility((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  console.log("here", preparedData);
  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <h1 className="font-sans text-xl font-medium">Users Statistics Page</h1>
      <div className="flex gap-4">
        <select
          className="p-2 border rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Array.from(new Set(counts.map((user) => user.year.toString()))).map(
            (year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            )
          )}
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

      <div className="flex flex-wrap gap-2">
        {Object.keys(lineVisibility).map((type, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lineVisibility[type]}
              onChange={() => handleCheckboxChange(type)}
            />
            {type}
          </label>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-sans text-lg font-medium">Users </h2>
        <div className="flex flex-row items-center gap-8 pt-6">
          <LineChart
            width={800}
            height={400}
            data={preparedData} // Unified data array
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              interval={1}
              dataKey={xAxisDataKey} // Use "month" or "day"
              tickFormatter={(tick) =>
                xAxisDataKey === "month" ? months[tick] : tick
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(lineVisibility).map(
              (type, index) =>
                lineVisibility[type] && (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={type} // Map to type-specific count
                    name={type}
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                    activeDot={{ r: 8 }}
                  />
                )
            )}
          </LineChart>
          <div className="mt-8 flex justify-center items-center bg-purple-50 py-3 px-4 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <label className="text-xl font-semibold text-purple-700">
                  Total Number Of Users:
                </label>
                <p className="text-4xl font-bold text-purple-900">
                  {totalNum} Users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
