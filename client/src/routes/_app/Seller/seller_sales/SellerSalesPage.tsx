import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSeller } from "../../../../custom_hooks/sellerGetUpdate";
import { useGetSellerSales } from "../../../../custom_hooks/products/useGetSellerSales";
import { SalesChart } from "../../../../components/Shop/SalesChart";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../../../../custom_hooks/auth";
import { SellerRevPage } from "./SellerRevPage";

export function SellerSalesPage() {
  const { username } = useParams<{ username: string }>();
  const [compactView, setCompactView] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { isAuthenticated, isLoading, isError } = useAuth(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
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

  const {
    user: seller,
    loading: sellerLoading,
    error: sellerError,
  } = useGetSeller(username);
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
  const {
    sales,
    loading: salesLoading,
    error: salesError,
  } = useGetSellerSales(
    seller?._id,
    compactView,
    months.indexOf(selectedMonth)
  );

  const [filteredSales, setFilteredSales] = useState(sales);
  console.log("sales", sales);
  console.log("filtered", filteredSales);
  const handleCompactViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newCompactView: boolean
  ) => {
    setCompactView(newCompactView);
    if (newCompactView) {
      setFilteredSales(sales);
    }
  };

  const handleSelectProductChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProduct(event.target.value);
    setFilteredSales(
      sales.filter(
        (sale: { productName: string }) =>
          sale.productName === event.target.value
      )
    );
  };
  const handleSelectMonthChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMonth(event.target.value);
    setFilteredSales(
      sales.filter((sale: { productName: string }) =>
        selectedProduct !== "" ? sale.productName === event.target.value : true
      )
    );
  };
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
  if (sellerLoading) {
    return <div>Loading...</div>;
  }

  if (sellerError || !seller || salesError) {
    return <div>Error: {sellerError || salesError}</div>;
  }

  const productsSet: { [key: string]: boolean } = {};

  sales.forEach((sale: { productName: string }) => {
    productsSet[sale.productName] = true;
  });

  const productNames = Object.keys(productsSet);

  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <h1 className="font-sans text-xl font-medium">
        Sales Page for {username}
      </h1>
      <ToggleButtonGroup
        color="primary"
        value={compactView}
        exclusive
        onChange={handleCompactViewChange}
        aria-label="Platform"
      >
        <ToggleButton value={true}>Simplified View</ToggleButton>
        <ToggleButton value={false}>Detailed View</ToggleButton>
      </ToggleButtonGroup>
      {salesLoading ? (
        <ClipLoader />
      ) : (
        <>
          {!compactView && (
            <div>
              <label htmlFor="product-select" className="mr-2">
                Filter by Product:{" "}
              </label>
              <select
                id="product-select"
                className="px-4 py-3 border border-gray-300 rounded-lg"
                onChange={handleSelectProductChange}
              >
                <option value="" selected disabled>
                  Select a Product
                </option>
                {productNames.map((productName) => (
                  <option key={productName} value={productName}>
                    {productName}
                  </option>
                ))}
              </select>
              <label htmlFor="year-select" className="mr-2 ml-3">
                Filter by year:{" "}
              </label>
              <select
                className="p-2 border rounded "
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
                className="px-4 py-3 border border-gray-300 rounded-lg"
                value={selectedMonth}
                onChange={handleSelectMonthChange}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          )}
          {compactView && <SalesChart data={sales} compactView={compactView} />}
          {!compactView && (
            <SellerRevPage
              sellerId={seller?._id}
              month={months.indexOf(selectedMonth)}
              year={parseInt(selectedYear)}
              productName={selectedProduct}
            />
          )}
        </>
      )}
    </div>
  );
}
