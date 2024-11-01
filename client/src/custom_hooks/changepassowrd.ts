import { useState, useEffect } from "react";
import axios from "axios";

export function ChangePassword(username: string, oldPassword: string, newpassword: string){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const body = {
        username: username,
        oldPassword: oldPassword,
        newPassword: newpassword
    };
    const url = `/traventure/api/user/changePassword/`;
    useEffect(() => {
      const updateSeller = async () => {
        try {
          const { data } = await axios.patch(url, body);
         
        } catch (err) {
          setError("error Updating seller");
        } finally {
          setLoading(false);
        }
      };
      if (username!=="" && oldPassword!=="" && newpassword!=="") updateSeller();
    });
    return { loading, error };
}

export const editpassword = async (username: string, oldPassword: string, newpassword: string) => {
    const body = {
        username: username,
        oldPassword: oldPassword,
        newPassword: newpassword
    };
    const response = await fetch(`/traventure/api/user/changePassword/`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errorMessage;
      switch (response.status) {
        case 401:
          errorMessage = "Incorrect old password";
          break;
        case 403:
          errorMessage ="Can't change to same old password";
          break;
        case 404:
          errorMessage = "User not found";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      throw new Error(errorMessage); // Throw the specific error message
    }
    return response.json();
  };