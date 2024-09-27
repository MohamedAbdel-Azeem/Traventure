import React from "react";
import axios from "axios";
const NewApp = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/admin/all", {
                    params: {
                        username: "SeifTarek",
                    }
                });
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const requestt = [
        "name",
        "age",
        "location"];

    return ( 
    <div>
        {requestt.map(
            request => (
            <div key="request">
                {request}
            </div>
            ))}
    </div>
    );
}
 
export default NewApp;