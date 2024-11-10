import axios from "axios";
import { useState, useEffect } from "react";

interface DeleteRequest {
  user_id: string;
  name: string;
  type: string;
  wallet: number;
}

export const useDeleteDeleteRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDeleteRequest = async (
    name: string,
    user_id: string,
    wallet: number,
    type: string
  ) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/traventure/api/requestdelete/deleterequestdelete`,
        {
          data: {
            name,
            user_id,
            wallet,
            type,
          },
        }
      );

      setError(null);
    } catch (error: any) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteDeleteRequest, loading, error };
};
