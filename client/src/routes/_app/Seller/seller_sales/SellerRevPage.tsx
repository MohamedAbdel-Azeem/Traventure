import axios from "axios";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Revenue {
  productName: string;
  price: number;
  soldQuantity: number;
  month: number;
  year: number;
  day: number;
}

export function SellerRevPage(props: {
  sellerId: string;
  month: number;
  year: number;
  productName: string;
}) {
  const { sellerId, month, year, productName } = props;
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = `/traventure/api/purchase/revenue`;

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true); // Set loading state before fetching
        const { data } = await axios.get(url, {
          params: {
            sellerId: sellerId,
            year: year,
            month: month === 0 ? null : month,
            productName: productName?.length > 0 ? productName : null,
          },
        });
        setRevenue(data);
      } catch (err) {
        setError("Error getting seller sales");
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, [month, year, sellerId, productName]);
  let totalRevenue = 0;
  const getChartData = () => {
    let chartLabels: string[] = [];
    let chartData: number[] = [];
    // Initialize total revenue

    console.log("initial revenue", revenue);

    if (month === 0) {
      // For all months in the year, aggregate total revenue per month
      const monthlyRevenue = Array(12).fill(0); // Array for 12 months
      revenue.forEach((item) => {
        if (item.year === year) {
          // Aggregate for all products or a specific product
          if (productName === "" || item.productName === productName) {
            monthlyRevenue[item.month - 1] += item.price;
            totalRevenue += item.price; // Add to total revenue
            // Sum up the revenue for each month
          }
        }
      });
      chartLabels = Array.from({ length: 12 }, (_, index) =>
        new Date(0, index).toLocaleString("default", { month: "long" })
      );
      chartData = monthlyRevenue;
    } else {
      // For a specific month, aggregate total revenue per day
      const dailyRevenue = Array(31).fill(0); // Array for up to 31 days
      revenue.forEach((item) => {
        if (item.year === year && item.month === month) {
          // Aggregate for all products or a specific product
          if (productName === "" || item.productName === productName) {
            dailyRevenue[item.day - 1] += item.price;
            totalRevenue += item.price; // Add to total revenue
            // Sum revenue for the day
          }
        }
      });
      chartLabels = Array.from({ length: 31 }, (_, index) =>
        (index + 1).toString()
      );
      chartData = dailyRevenue;
    }

    // Set total revenue once, after processing

    return chartLabels.map((label, index) => ({
      name: label,
      revenue: chartData[index],
    }));
  };

  const chartData = getChartData();
  console.log(chartData);

  return (
    <div>
      <h1>Revenue Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-row justify-center items-center space-x-4">
          <LineChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => value.toLocaleString()}
              tick={{ fontSize: 13 }} // Reduce font size to fit large values
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
          <div className="mt-8 flex justify-center items-center bg-purple-50 py-3 px-4 rounded-lg shadow-md border border-purple-200 max-w-md mx-auto h-1/4">
            <div className="flex items-center space-x-4">
              <div className=" items-center">
                <label className="text-xl font-semibold text-purple-700">
                  Total Revenue:
                </label>
                <p className="text-4xl font-bold text-purple-900">
                  EGP{" "}
                  {totalRevenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
