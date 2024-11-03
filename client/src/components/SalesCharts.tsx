import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { formatDataBarChart } from "../utils/formatDataBarChart";

const BarChartCustomTooltip: React.FC = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, sold, remaining } = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Name: ${name}`}</p>
        <p>{`Sold: ${sold}`}</p>
        <p>{`Remaining: ${remaining}`}</p>
      </div>
    );
  }
  return null;
};

export function SingleProductSalesChart({ data }) {
  const formattedData = formatDataBarChart(data);
  console.log(formattedData);
  return (
    <BarChart width={730} height={250} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={BarChartCustomTooltip} />
      <Bar dataKey="sold" fill="#8884d8" />
    </BarChart>
  );
}
