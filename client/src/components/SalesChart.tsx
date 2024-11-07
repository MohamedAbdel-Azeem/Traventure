import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LineChart,
  Line,
} from "recharts";

const CustomTooltip: React.FC = ({ active, payload }) => {
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

function SingleProductSalesChart({ data }) {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="productName" />
      <YAxis allowDecimals={false} />
      <Tooltip content={CustomTooltip} />
      <Bar dataKey="soldQuantity" fill="#8884d8" />
    </BarChart>
  );
}

function DetailedViewSalesChart({ data }) {
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip content={CustomTooltip} />
      <Line type="monotone" dataKey="soldQuantity" stroke="#8884d8" />
    </LineChart>
  );
}

export function SalesChart({ data, compactView }) {
  return compactView ? (
    <SingleProductSalesChart data={data} />
  ) : (
    <DetailedViewSalesChart data={data} />
  );
}
