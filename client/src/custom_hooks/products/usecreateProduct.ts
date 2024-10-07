import axios from "axios";
import { useEffect, useState } from "react";

interface Seller {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAccepted: boolean;
  __v: number;
  description?: string;
  name?: string;
}

interface DataStructure {
  sellers: Seller[];
}





export function useCreateProduct(body: object | null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        if (body === null) return;
        setLoading(true);
        setError(null);
        try {

          const tempresponse = await axios.get<DataStructure>("/traventure/api/admin/all", {
            params: {
              username: "Ibra",
            },
          }) ;
        const allUsers = tempresponse.data;

        const idtoAddby = allUsers.sellers.find(thing => thing.username === body.seller);
        body.seller = idtoAddby?._id as string;




          const response = await axios.post("/traventure/api/product/add", body);
          if (response.status >= 200 && response.status < 300) {
            setData(response.data);
          } else {
            throw new Error("Server can't be reached!");
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [body]);
    return { data, loading, error };
  };