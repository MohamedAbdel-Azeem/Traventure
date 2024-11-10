import { useState, useEffect } from "react";
import axios from "axios";

const useGetTourGuideId = (username: string) => {
  const [tourGuideId, setTourGuideId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourGuideId = async () => {
      try {
        const response = await axios.get(
          `/traventure/api/tourGuide/${username}`,
          {
            params: { username },
          }
        );

        setTourGuideId(response.data._id);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourGuideId();
  }, [username]);

  return { tourGuideId, loading, error };
};

export default useGetTourGuideId;
