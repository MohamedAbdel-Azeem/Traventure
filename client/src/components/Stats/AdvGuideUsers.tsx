import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

interface Props {
  month: string;
  actItenName: string;
  type: string;
  username: string;
}

interface Revenue {
  name: string; // Activity or Itinerary name
  year: number;
  month: number;
  day: number;
  revenue: number;
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

export default function AdvGuideUsers({
  month,
  actItenName,
  type,
  username,
}: Props) {
  console.log(month, actItenName, type, username);
  const [revenue, setRevenue] = useState<Revenue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "advertiser") {
        try {
          const res = await axios.get(
            `/traventure/api/advertiser/numstats/${username}`,
            {
              params: {
                month: month === "ALL" ? null : months.indexOf(month),
                actItenName: actItenName === "" ? null : actItenName,
              },
            }
          );
          setRevenue(res.data);
          console.log("data", res.data);
        } catch (error) {
          console.error("Error fetching revenue data:", error);
        }
      }
      if (type === "tourguide") {
        try {
          const res = await axios.get(
            `/traventure/api/tourguide/userstats/${username}`,
            {
              params: {
                month: month === "ALL" ? null : months.indexOf(month),
                actItenName: actItenName === "" ? null : actItenName,
              },
            }
          );
          setRevenue(res.data);
          console.log("data", res.data);
        } catch (error) {
          console.error("Error fetching revenue data:", error);
        }
      }
    };
    fetchData();
  }, [month, actItenName, type, username]);

  const xAxisDataKey = month === "ALL" ? "month" : "day";

  // Group revenue by `actItenName`
  const groupedData: { [key: string]: { [key: string]: number }[] } = {};
  revenue.forEach((rev) => {
    const groupKey = rev.name;
    const xKey = month === "ALL" ? rev.month : rev.day;

    if (!groupedData[groupKey]) {
      groupedData[groupKey] = Array.from(
        { length: month === "ALL" ? 12 : 31 },
        (_, i) => ({
          [xAxisDataKey]: i + 1,
          revenue: 0, // Default revenue
        })
      );
    }

    const dataPoint = groupedData[groupKey].find(
      (point) => point[xAxisDataKey] === xKey
    );

    if (dataPoint) {
      dataPoint.revenue = rev.revenue;
    }
  });

  // Filter lines to show only selected activity or "ALL"
  const filteredGroupedData =
    actItenName === "" // When "ALL" is selected
      ? groupedData
      : { [actItenName]: groupedData[actItenName] };

  // Convert grouped data into an array format for plotting
  const chartData = Array.from(
    { length: month === "ALL" ? 12 : 31 },
    (_, i) => {
      const dataPoint: any = { [xAxisDataKey]: i + 1 };
      Object.keys(filteredGroupedData).forEach((key) => {
        const entry = filteredGroupedData[key]?.find(
          (point) => point[xAxisDataKey] === i + 1
        );
        dataPoint[key] = entry ? entry.revenue : 0;
      });
      return dataPoint;
    }
  );
  console.log("filtered", filteredGroupedData);
  return (
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
      {Object.keys(filteredGroupedData).map((key, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={key}
          name={key}
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  );
}
