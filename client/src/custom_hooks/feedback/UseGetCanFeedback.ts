import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const UseGetCanFeedback = (
  touristUsername: string,
  tourGuideUserId: string
) => {
  const [CanFeedback, setCanFeedback] = useState<boolean>(false);
  const [cloading, setcLoading] = useState(false);
  const [cerror, setcError] = useState<string | null>(null);
  const fetchCanFeedback = useCallback(async () => {
    setcLoading(true);

    try {
      const body = { touristUsername, tourGuideUserId };

      const response = await axios.get(
        `/traventure/api/feedBack/canfeedback?touristUsername=${touristUsername}&tourGuideUserId=${tourGuideUserId}`
      );

      if (response.status >= 200 && response.status < 300) {
        setCanFeedback(response.data.canProvideFeedback);
      } else {
        setcError("Error fetching data");
      }
    } catch (err) {
      setcError(err.message);
    } finally {
      setcLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchCanFeedback();
  }, []);
  return { CanFeedback, cloading, cerror };
};
