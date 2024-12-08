import "./Table.css";
import TouristTable from "./TouristTable";
import Admin_TourismGovernorTable from "./Admin_TourismGovernorTable";
import TourGuide_Advertiser_SellerTable from "./TourGuide_Advertiser_SellerTable";
import { useGetAllUsers } from "../../../../custom_hooks/tourist_fetchandelete";
import { useAuth } from "../../../../custom_hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
const Accounts = () => {
  const { isAuthenticated, isLoading, isError } = useAuth(3);
  const { username } = useParams<{ username: string }>();

  const { data } = useGetAllUsers();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#f86c6b" loading={true} size={150} />
      </div>
    );
  }
  if (isError || isAuthenticated !== username) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Error 403 Unauthorized access</h1>
      </div>
    );
  }
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[1500px]">
        <div className="my-8">
          <TouristTable />
        </div>
        <div className="my-8">
          <Admin_TourismGovernorTable
            dataG={data?.governors}
            dataA={data?.admins}
            name="Tourism Governor"
          />
        </div>
        <div className="my-8">
          <Admin_TourismGovernorTable
            dataG={data?.governors}
            dataA={data?.admins}
            name="Admin"
          />
        </div>
        <div className="my-8">
          <TourGuide_Advertiser_SellerTable
            dataT={data?.tourGuides}
            dataS={data?.sellers}
            dataA={data?.advertisers}
            name="Tour Guide"
          />
        </div>
        <div className="my-8">
          <TourGuide_Advertiser_SellerTable
            dataT={data?.tourGuides}
            dataS={data?.sellers}
            dataA={data?.advertisers}
            name="Advertiser"
          />
        </div>
        <div className="my-8">
          <TourGuide_Advertiser_SellerTable
            dataT={data?.tourGuides}
            dataS={data?.sellers}
            dataA={data?.advertisers}
            name="Seller"
          />
        </div>
      </div>
    </div>
  );
};

export default Accounts;
