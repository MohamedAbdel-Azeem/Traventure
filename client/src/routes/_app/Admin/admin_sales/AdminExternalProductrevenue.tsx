import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useGetExternalSellers } from "../../../../custom_hooks/useGetExternalSellers";

interface Revenue {
  productName: string;
  price: number;
  soldQuantity: number;
  month: number;
  year: number;
  day: number;
}

export function AdminExternalProductrevenue() {
  const {
    externalSellers,
    loading: sellersLoading,
    error: sellersError,
  } = useGetExternalSellers();

  const [revenueData, setRevenueData] = useState<Revenue[]>([]);
  const generateYearsArray = (): number[] => {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const yearsArray = [];

    for (let year = startYear; year <= currentYear; year++) {
      yearsArray.push(year);
    }

    return yearsArray;
  };
  const years = generateYearsArray();
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
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
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [productNames, setProductNames] = useState<string[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `/traventure/api/product/externalproducts`,
          {
            params: {
              externalSellers: selectedSeller === "" ? null : selectedSeller,
            },
          }
        );
        setProductNames(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedSeller]);
  const [filters, setFilters] = useState({
    externalSeller: selectedSeller,
    productName: selectedProduct === "" ? null : selectedProduct,
    month: selectedMonth === "ALL" ? null : months.indexOf(selectedMonth),
    year: parseInt(selectedYear),
  });
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      month: selectedMonth === "ALL" ? null : months.indexOf(selectedMonth),
      year: parseInt(selectedYear),
      productName: selectedProduct === "" ? null : selectedProduct,
      externalSeller: selectedSeller,
    }));
  }, [selectedMonth, selectedYear, selectedProduct]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/traventure/api/purchase/revenue", {
          params: filters,
        });
        setRevenueData(data);
      } catch (err) {
        setError("Error fetching revenue data");
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, [filters]);

  const aggregateRevenue = () => {
    let chartData: { name: string; revenue: number }[] = [];
    let total = 0;

    // Aggregate revenue by month or day based on the filters
    if (filters.month === null) {
      // Aggregate by month for the entire year
      const monthlyRevenue = Array(12).fill(0);
      revenueData.forEach((item) => {
        if (item.year === filters.year) {
          monthlyRevenue[item.month - 1] += item.price;
          total += item.price;
        }
      });

      // Map the aggregated monthly revenue data into chartData
      chartData = monthlyRevenue.map((revenue, index) => ({
        name: new Date(0, index).toLocaleString("default", { month: "long" }), // Month name (January, February, etc.)
        revenue,
      }));
    } else {
      // Aggregate by day for a specific month
      const dailyRevenue = Array(31).fill(0);
      revenueData.forEach((item) => {
        if (item.year === filters.year && item.month === filters.month) {
          dailyRevenue[item.day - 1] += item.price;
          total += item.price;
        }
      });

      // Map the aggregated daily revenue data into chartData
      chartData = dailyRevenue.map((revenue, index) => ({
        name: (index + 1).toString(), // Day number (1, 2, 3, etc.)
        revenue,
      }));
    }

    setTotalRevenue(total); // Set the total revenue to be displayed
    return chartData;
  };

  // Use useMemo to ensure that aggregateRevenue is recalculated when revenueData or filters change
  const chartData = useMemo(() => aggregateRevenue(), [revenueData, filters]);

  return (
    <div>
      <div>
        <div>
          <label>External Seller: </label>
          <select
            className="p-2 border rounded mr-3"
            onChange={(e) => setSelectedSeller(e.target.value)}
          >
            <option value="">All</option>
            {externalSellers.map((seller) => (
              <option key={seller} value={seller}>
                {seller}
              </option>
            ))}
          </select>
          <label htmlFor="product-select" className="mr-2">
            Filter by Product:{" "}
          </label>
          <select
            id="product-select"
            className="px-4 py-3 border mr-3 border-gray-300 rounded-lg"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, productName: e.target.value }))
            }
          >
            <option value="">All</option>
            {productNames.map((productName) => (
              <option key={productName.name} value={productName.name}>
                {productName.name}
              </option>
            ))}
          </select>

          <label htmlFor="year-select" className="mr-2 ml-3">
            Filter by year:{" "}
          </label>
          <select
            className="p-2 border rounded mr-3"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label htmlFor="month-select" className="mr-2 ml-3">
            Filter by Month:{" "}
          </label>
          <select
            id="month-select"
            className="px-4 py-3 border border-gray-300 rounded-lg mr-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="flex flex-row gap-3">
          <LineChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => value.toLocaleString()} />
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
