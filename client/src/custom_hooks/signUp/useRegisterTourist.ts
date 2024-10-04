import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function useRegisterUser(body: object | null, role: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handlenewUser() {
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

    Swal.fire({
      title: title,
      text: "You can now login",
      icon: "success",
    }).then(() => {
      navigate("/"); 
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      if (role === null) return;
      if (body === null) return;
      const url = `traventure/api/${role}/add`;
      setLoading(true);
      setError(null);
      console.log(body);
      try {
        const response = await axios.post(url, body);
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          if(body !== null){
          handlenewUser();
          }
        }
        else if(response.status === 409){
          throw new Error(); 
          }
         else {
          throw new Error("Server can't be reached!");
        }
      } catch (error: any) {

          if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error); 
        } else {
          setError(error.message);}
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [body]);
  return { data, loading, error };
}

export default useRegisterUser;
