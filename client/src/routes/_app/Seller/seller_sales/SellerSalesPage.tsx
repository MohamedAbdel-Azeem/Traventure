import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSeller } from "../../../../custom_hooks/sellerGetUpdate";
import { useGetSellerSales } from "../../../../custom_hooks/products/useGetSellerSales";
import { SalesChart } from "../../../../components/Shop/SalesChart";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ClipLoader from "react-spinners/ClipLoader";


export function SellerSalesPage() {
  const { username } = useParams<{ username: string }>();

  const [compactView, setCompactView] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");

  const {
    user: seller,
    loading: sellerLoading,
    error: sellerError,
  } = useGetSeller(username);

  const {
    sales,
    loading: salesLoading,
    error: salesError,
  } = useGetSellerSales(seller?._id, compactView);

  const [filteredSales, setFilteredSales] = useState(sales);

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

  if (sellerLoading) {
    return (
      <div>
        <NewNavbar />
        Loading...
      </div>
    );
  }

  if (sellerError || !seller || salesError) {
    return (
      <div>
        Error: {sellerError || salesError}
      </div>
    );
  }

  const productsSet: { [key: string]: boolean } = {};

  sales.forEach((sale: { productName: string }) => {
    productsSet[sale.productName] = true;
  });

  const productNames = Object.keys(productsSet);

  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <NewNavbar />
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
            </div>
          )}
          {(compactView || (!compactView && selectedProduct !== "")) && (
            <SalesChart
              data={compactView ? sales : filteredSales}
              compactView={compactView}
            />
          )}
        </>
      )}
    </div>
  );
}
