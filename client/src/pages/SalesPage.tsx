import { useParams } from "react-router-dom";
import { useGetSeller } from "../custom_hooks/sellerGetUpdate";
import { useGetSellerSales } from "../custom_hooks/products/useGetSellerSales";
import { SingleProductSalesChart } from "../components/SalesCharts";

export function SellerSalesPage() {
  const { username } = useParams<{ username: string }>();

  const {
    user: seller,
    loading: sellerLoading,
    error: sellerError,
  } = useGetSeller(username);

  const {
    sales,
    loading: salesLoading,
    error: salesError,
  } = useGetSellerSales(seller?._id, true);

  if (sellerLoading || salesLoading) {
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
      <SingleProductSalesChart data={sales} />
    </div>
  );
}
