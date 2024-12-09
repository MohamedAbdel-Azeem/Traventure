import { useGetExternalSellers } from "../../../../custom_hooks/useGetExternalSellers";
import { useEffect, useState } from "react";
import axios from "axios";
import { SalesChart } from "../../../../components/Shop/SalesChart";
import { useAuth } from "../../../../custom_hooks/auth";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

interface ISales {
  productId: string;
  soldQuantity: number;
  productName: string;
  remaningQuantity: number;
}

export function AdminSalesPage() {
  const { isAuthenticated, isLoading, isError } = useAuth(3);
  const { username } = useParams<{ username: string }>();
  const {
    externalSellers,
    loading: sellersLoading,
    error: sellersError,
  } = useGetExternalSellers();
  const [chosenExternalSeller, setChosenExternalSeller] = useState<string>("");
  const [sales, setSales] = useState<ISales[]>([]);

  useEffect(() => {
    if (chosenExternalSeller === "") return;
    const url = `/traventure/api/purchase/seller`;
    const fetchSales = async () => {
      try {
        const { data } = await axios.get(url, {
          params: {
            externalSeller: chosenExternalSeller,
            compactView: true,
          },
        });
        setSales(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSales();
  }, [chosenExternalSeller]);
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
  if (sellersLoading) {
    return <div>Loading...</div>;
  }

  if (sellersError) {
    return <div>Error: {sellersError}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <h1 className="font-sans text-xl font-medium">Admin Sales Page</h1>
      <select
        title="externalSeller"
        className="px-4 py-3 border border-gray-300 rounded-lg"
        onChange={(e) => setChosenExternalSeller(e.target.value)}
      >
        <option value="" disabled selected>
          Select an external seller
        </option>
        {externalSellers.map((seller) => {
          return (
            <option key={seller} value={seller}>
              {seller}
            </option>
          );
        })}
      </select>
      {sales.length > 0 && <SalesChart data={sales} compactView={true} />}
    </div>
  );
}
