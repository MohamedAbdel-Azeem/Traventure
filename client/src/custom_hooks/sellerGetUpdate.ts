import { useState, useEffect } from 'react';
import axios from 'axios';
import { ISeller } from '../routes/_app/seller_profile/ISeller';

export const useGetSeller = (username: string) => {
    const [user, setUser] = useState<ISeller | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const url=`traventure/api/seller/${username}`;
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const { data } = await axios.get(url);
                setUser(data);
            } catch (err) {
                setError("erro getting seller");
            }
            finally{
                setLoading(false);
            }
        }
        fetchSeller();
    }, [username]);
    return { user, loading, error };
}

export function useUpdateSeller(body:object,username: string) {
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [response, setresponse] = useState<ISeller | null>(null);
const url=`traventure/api/seller/update/${username}`;
    useEffect(() => {
        const updateSeller = async () => {
            try {
                const { data } = await axios.patch(url,body);
                setresponse(data);
            } catch (err) {
                setError("erro getting seller");
            }
            finally{
                setLoading(false);
            }
        }
        if(username && body)
            updateSeller();
    }, [body,username]);
    return { response, loading, error };
}

    
