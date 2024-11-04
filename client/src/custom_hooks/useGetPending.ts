import axios from "axios";

export  const getAllPendingUsers = async () => {
    const url = `/traventure/api/admin/pendingusers`;
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
     return "error fetching pending users" ;
    } 
  };