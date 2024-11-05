import { useGetExternalSellers } from "../custom_hooks/useGetExternalSellers";
import { useEffect, useState } from "react";
import axios from "axios";
import { SingleProductSalesChart } from "../components/SalesCharts";

interface ISales {
  productId: string;
  soldQuantity: number;
  productName: string;
  remaningQuantity: number;
}

export function AdminSalesPage() {
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
        console.log(data);
      } catch (err) {
        console.log("error getting seller sales");
      }
    };
    fetchSales();
  }, [chosenExternalSeller]);

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
      {sales.length > 0 && <SingleProductSalesChart data={sales} />}
    </div>
  );
}
