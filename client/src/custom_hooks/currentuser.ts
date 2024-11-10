import axios from "axios";
import { useEffect, useState } from "react";

interface Currentuserdata {
  profilepic: string;
}

export function GetCurrentUser(username: string) {
  const [cuserdata, setUserdata] = useState<Currentuserdata | null>(null);
  const [userloading, setUserLoading] = useState(true);
  const [usererror, setUserError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (username: string) => {
      setUserLoading(true);
      setUserError(null);
      try {
        const response = await axios.get(`/traventure/api/user/me/${username}`);
        if (response.status >= 200 && response.status < 300) {
          setUserdata(response.data);
        } else {
          throw new Error("Server can't be reached!");
        }
      } catch (error: any) {
        setUserError(error.message);
      } finally {
        setUserLoading(false);
      }
    };
    fetchData(username);
  }, [username]);

  return { cuserdata, userloading, usererror };
}
