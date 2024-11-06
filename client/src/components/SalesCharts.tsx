import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

const BarChartCustomTooltip: React.FC = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { productName, soldQuantity, remainingQuantity } = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Product Name: ${productName}`}</p>
        <p>{`Sold: ${soldQuantity}`}</p>
        <p>{`Remaining: ${remainingQuantity}`}</p>
      </div>
    );
  }
  return null;
};

export function SingleProductSalesChart({ data }) {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="productName" />
      <YAxis allowDecimals={false} />
      <Tooltip content={BarChartCustomTooltip} />
      <Bar dataKey="soldQuantity" fill="#8884d8" />
    </BarChart>
  );
}
