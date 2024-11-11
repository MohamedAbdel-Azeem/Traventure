import Dashboard from "../../../components/Dashboard";
const LandingPage = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex-1 p-4">
          <h1>Main Content Area</h1>
        </div>
      </div>

      <div
        style={{
          margin: `20px 20px 20px 100px`,
          transition: "200ms",
        }}
      >
        <Dashboard />
      </div>
    </div>
  );
};
export default LandingPage;
