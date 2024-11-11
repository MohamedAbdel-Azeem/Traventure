import { useState } from "react";
import Dashboard from "../../../components/Dashboard";

const AdvertiserPage = () => {
   const [content, setContent] = useState(<Dashboard/>);
   
    return (
        <div>

            <div
                style={{
                    margin: `20px 20px 20px 100px`,
                    transition: "200ms",
                }}
            >
                {content}
            </div>
        </div>
    );
};

export default AdvertiserPage;
