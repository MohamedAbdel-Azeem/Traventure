import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSeller } from "../custom_hooks/sellerGetUpdate";
import { useGetSellerSales } from "../custom_hooks/products/useGetSellerSales";
import { SalesChart } from "../components/SalesChart";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ClipLoader from "react-spinners/ClipLoader";

export function SellerSalesPage() {
  const { username } = useParams<{ username: string }>();

  const [compactView, setCompactView] = useState(true);

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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newCompactView: boolean
  ) => {
    setCompactView(newCompactView);
  };

  if (sellerLoading) {
    return <div>Loading...</div>;
  }

  if (sellerError || !seller || salesError) {
    return <div>Error: {sellerError || salesError}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <h1 className="font-sans text-xl font-medium">
        Sales Page for {username}
      </h1>
      <ToggleButtonGroup
        color="primary"
        value={compactView}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value={true}>Simplified View</ToggleButton>
        <ToggleButton value={false}>Detailed View</ToggleButton>
      </ToggleButtonGroup>
      {salesLoading ? (
        <ClipLoader />
      ) : (
        <SalesChart data={sales} compactView={compactView} />
      )}
    </div>
  );
}
