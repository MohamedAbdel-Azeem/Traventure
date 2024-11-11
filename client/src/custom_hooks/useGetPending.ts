import axios from "axios";
import { ITourGuide } from "../routes/_app/TourGuide/tourguide_profile/ITourGuide";
import { ISeller } from "../routes/_app/seller_profile/ISeller";
import { IAdvertiser } from "../routes/_app/Advertiser/advertiser_profile/IAdvertiser";
import { useEffect, useState } from "react";

interface Applicant {
    username: string;
    email: string;
    documents: string;
}
type Pending = {
  tourGuides: Applicant[];
  sellers: Applicant[];
  advertisers: Applicant[];
};

export function GetAllPendingUsers() {
    const [pendingdata, setpendingdata] = useState<Pending|null>(null);
    const [pendingloading, setpendingLoading] = useState(true);
    const [pendingerror, setpendingError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setpendingLoading(true);
            setpendingError(null);
            try {
                const response = await axios.get(`/traventure/api/admin/pendingusers`);
                if (response.status >= 200 && response.status < 300) {
                    setpendingdata(response.data);
                }
                else {
                    throw new Error("Server can't be reached!");
                }
            }
            catch (error : any) {
                setpendingError(error.message);
            }
            finally {
                setpendingLoading(false);
            }
        };
        fetchData();
    }, []);
    return {pendingdata, pendingloading, pendingerror };
}