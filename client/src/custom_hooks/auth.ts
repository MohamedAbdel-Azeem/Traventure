import axios from 'axios';
import { useState, useEffect } from 'react';

export const useAuth = (module?: number) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<string>("");

    useEffect(() => {
        const authenticate = async () => {
            setIsLoading(true);
            setIsError(false);

            const formData = {
                module: module,
            };

            try {
                const response = await axios.post("/traventure/api/user/auth", formData, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                    setIsAuthenticated(response.data);
                } else {
                    setIsAuthenticated("");
                }
            } catch (error) {
                setIsError(true);
                setIsAuthenticated("");
            } finally {
                setIsLoading(false);
            }
        };

        authenticate();
    }, [module]);

    return { isLoading, isError, isAuthenticated };
};