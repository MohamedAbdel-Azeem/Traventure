import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface DataStructure {
  _id: string;
  name: string;
  __v: number;
}

export const useGetAllCategories = () => {
  const [data, setData] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hardId, sethardId]=useState<string>('66f6e4f9fe182e23156d18d6');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("traventure/api/category");
        const names = response.data.map((item: DataStructure) => item.name);
        setData(names);
        setLoading(false);
        console.log(names);
      } catch (error) {
        console.error("Error fetching data:", error);
        const axiosError = error as AxiosError;
        setError(axiosError.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
export const useGetAllCategoriesD = () => {
  const [data, setData] = React.useState<DataStructure[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("traventure/api/category");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        const axiosError = error as AxiosError;
        setError(axiosError.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const deleteCategories = async (categoryName: string) => {
  try {
    const response = await axios.get("traventure/api/category");
    const data: DataStructure[] = response.data;

    const categoryToDelete = data.find(category => category.name === categoryName);

    if (!categoryToDelete) {
      throw new Error(`Category with name ${categoryName} not found`);
    }

    const responseDelete = await fetch(`traventure/api/category/delete/${categoryToDelete._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!responseDelete.ok) {
      throw new Error('Failed to delete category');
    }

    alert(`${categoryName} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

export function useAddCategory(body: object | null) {
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
        const response = await axios.post("traventure/api/category/add", body);
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
  }, [body]);
  return { data, loading, error };
};

export function useUpdateCategory(categoryName: string, body: object | null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const response = await axios.get("traventure/api/category");
      const qdata: DataStructure[] = response.data;
      const id = qdata.find(category => category.name === categoryName)?._id;
    
      if (body === null) return;
      console.log(id);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put(`traventure/api/category/update/${id}`, body);
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
  }, [categoryName, body]);
  return { data, loading, error };
}

//----------------------------------------------------------------------------------------------------
export const useGetAllTags = () => {
  const [data, setData] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [iddata, setidData] = React.useState<DataStructure[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/traventure/api/preferencetags");
        const names = response.data.map((item: DataStructure) => item.name);
        setidData(response.data);
        setData(names);
        setLoading(false);
        console.log(names);
      } catch (error) {
        console.error("Error fetching data:", error);
        const axiosError = error as AxiosError;
        setError(axiosError.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data,iddata, loading, error };
};
export const useGetTagsD = () => {
  const [data, setData] = React.useState<DataStructure[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("traventure/api/preferencetags");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        const axiosError = error as AxiosError;
        setError(axiosError.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const deleteTags = async (tagName: string) => {
  try {
    const response = await axios.get("traventure/api/preferencetags");
    const data: DataStructure[] = response.data;

    const tagToDelete = data.find(tag => tag.name === tagName);

    if (!tagToDelete) {
      throw new Error(`Tag with name ${tagName} not found`);
    }

    const responseDelete = await fetch(`traventure/api/preferencetags/delete/${tagToDelete._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!responseDelete.ok) {
      throw new Error('Failed to delete tag');
    }

    alert(`${tagName} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting tag:", error);
  }
};

export function useAddTag(body: object | null) {
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
        const response = await axios.post("traventure/api/preferencetags/add", body);
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
  }, [body]);
  return { data, loading, error };
};

export function useUpdateTag(tagName: string, body: object | null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const response = await axios.get("traventure/api/preferencetags");
      const qdata: DataStructure[] = response.data;
      const id = qdata.find(tag => tag.name === tagName)?._id;
    
      if (body === null) return;
      console.log(id);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.put(`traventure/api/preferencetags/update/${id}`, body);
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
  }, [tagName, body]);
  return { data, loading, error };
}