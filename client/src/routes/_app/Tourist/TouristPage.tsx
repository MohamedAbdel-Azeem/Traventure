import Dashboard from "../../../components/Dashboard";
const TouristPage = () => {
    const navbarHeight = 64;
    return (
        <div>
            <div
                style={{
                    //margin: `20px 20px 20px 100px`,
                    transition: "200ms",
                }}
            >
                <Dashboard type="Tourist"/>
            </div>
        </div>
    );
};
export default TouristPage;
