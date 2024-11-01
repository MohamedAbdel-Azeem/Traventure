import { useCallback, useEffect, useState } from 'react';
import axios from "axios";

interface Tourist {
    _id: string;
    username: string;
    email: string;
    password: string; // Note: It's best not to expose passwords in a real app
    mobileNumber: string;
    dateOfBirth: string; // ISO date string
    nationality: string;
    Occupation: string; // It's better to use camelCase for consistency
    __v: number;
  }
  
  
  interface DataStructure {
    tourists: Tourist[];
  }

export const UseGetComplaints = () => {
    const [ccomplaints, setComplaints] = useState(null);
    const [cloading, setcLoading] = useState(false);
    const [cerror, setcError] = useState<string | null>(null);
    const fetchComplaints = useCallback(async () => {
        setcLoading(true);
      try {
        const response = await axios.get("/traventure/api/complaint/");
        if (response.status === 200) {
            setComplaints(response.data);
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
        fetchComplaints();
    }, []);
    return { ccomplaints, cloading, cerror, fetchComplaints };
  };
  
  export const UseGetComplaintsID = (ausername: string) => {
    const [ccomplaints, setComplaints] = useState(null);
    const [cloading, setcLoading] = useState(false);
    const [cerror, setcError] = useState<string | null>(null);
    const fetchComplaints = useCallback(async () => {
        setcLoading(true);
      try {

  
        const response = await axios.get(`/traventure/api/tourist/complains/${ausername}`);
        if (response.status === 200) {
            setComplaints(response.data);
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
        fetchComplaints();
    }, []);
    return { ccomplaints, cloading, cerror, fetchComplaints };
  };
  