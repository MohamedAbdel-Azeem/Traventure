import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { uploadFileToStorage } from "../firebase/firebase_storage";

 function useRegisterUser(body: object | null, role: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleNewUser() {
      let title = "User created successfully!";
      switch (role) {
        case "tourist":
          title = "New Tourist";
          break;
        case "tourguide":
          title = "New Tour Guide";
          break;
        case "seller":
          title = "New Seller";
          break;
        case "advertiser":
          title = "New Advertiser";
          break;
        default:
          title = "User created successfully!";
      }
      let message = "You can now login";
      if (role !== "tourist") {
        message = "Your documents as been sent wait for 1-2 buisness days for approval";
      }
      Swal.fire({
        title: title,
        text: message,
        icon: "success",
      }).then(() => {
        navigate("/");
      });
    }

    const fetchData = async () => {
      if (role === null) return;
      if (body === null) return;
      setLoading(true);
      const url = `/traventure/api/${role}/add`;
      if(role !== "tourist") {
      const {documents} = body as any;
      const firebaseurl = await uploadFileToStorage(documents);
      (body as any).documents = firebaseurl;
      setError(null);
      }

      try {
        const response = await axios.post(url, body);
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          handleNewUser();
        } else if (response.status === 409) {
          throw new Error();
        } else {
          throw new Error("Server can't be reached!");
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [body]);
  return { data, loading, error };
}

export default useRegisterUser;
