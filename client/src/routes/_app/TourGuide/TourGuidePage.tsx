import Itineraries from "../../../components/Itineraries";

const TourGuidePage = () => {
    return (
        <div>
            <div
                style={{
                  
                    transition: "200ms",
                }}>
                <h1 style={{ fontSize: '2.5em' }}>My Itineraries</h1>
                <Itineraries />
            </div>
        </div>
    );
};
export default TourGuidePage;