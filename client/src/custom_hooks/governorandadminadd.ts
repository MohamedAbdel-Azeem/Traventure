import { useState, useEffect } from "react";
import axios from "axios";

function useAddAdminandGovernor(body: object | null, role: string) {
  const urlg = "traventure/api/admin/add/governer";
  const urla = "traventure/api/admin/add";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (body === null) return;
      console.log(body);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(role.includes("Admin")?urla:urlg, body);
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          console.log(response.data);
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
  }, [body, role]);
  return { data, loading, error };
}
export default useAddAdminandGovernor;
