import axios from "axios";

export  const updateuserstatus = async (username: string, type: string, accept:boolean) => {
    const url = `/traventure/api/admin/acceptuser`;
    const body = {
        "username": username,
        "type": type,
        "isaccepted": accept
    };
    try {
      const { data } = await axios.patch(url, body);
      return data;
    } catch (err) {
     return "error Updating status" ;
    } 
  };