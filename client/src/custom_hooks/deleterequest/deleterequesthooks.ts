import axios from "axios";
import { useState, useEffect } from "react";

interface DeleteRequest {
  user_id: string;
  name: string;
  type: string;
  wallet: number;
}

export const useGetAllDeleteRequests = () => {
  const [drequests, setDrequests] = useState<DeleteRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/traventure/api/requestdelete/getRequestDelete`);
        setDrequests(response.data);
        if (response.data.length === 0) {
          console.log("No Requests found");
        } else {
          console.log("Requests found", response.data);
        }
        setError(null);
      } catch (error: any) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { drequests, loading, error };
};

export const useCreateDeleteRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createDeleteRequest = async (user_id: string, name: string, type: string, wallet: number) => {
    try {
      setLoading(true);
      const response = await axios.post(`/traventure/api/requestdelete/createrequestdelete`, {
        user_id,
        name,
        type,
        wallet,
      });
      console.log("Request created", response.data);
      setError(null);
    } catch (error: any) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createDeleteRequest, loading, error };
};

export const useDeleteDeleteRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDeleteRequest = async (username: string, isAccepted: boolean) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/traventure/api/requestdelete/deleterequestdelete`, {
        data: {
          username,
          isAccepted,
        },
      });
      console.log("Request deleted", response.data);
      setError(null);
    } catch (error: any) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteDeleteRequest, loading, error };
};