import { ISeller } from "../routes/_app/seller_profile/ISeller";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  seller: ISeller;
  quantity: number;
  feedback: {
    name: string;
    rating: string;
    review: string;
  }[];
}

interface Ipurchase {
  _id: string;
  touristId: string;
  productId: IProduct;
  timestamp: string;
  quantity: number;
}

type Apurchases = Ipurchase[];

interface IBarChartData {
  _id: string;
  name: string;
  sold: number;
  remaining: number;
}

type result = IBarChartData[];

export function formatDataBarChart(purchases: Apurchases): result {
  const data = {} as Record<string, IBarChartData>;
  purchases.forEach((purchase, index) => {
    const sold_quantity = purchase.quantity;
    const product_name = purchase.productId.name;
    const product_id = purchase.productId._id;
    const new_timestamp = purchase.timestamp;
    if (data[product_id]) {
      data[product_id].sold += sold_quantity;
      const old_index = data[product_id].remaining; // get Old Index to compare Dates
      const old_timestamp = purchases[old_index].timestamp;
      if (new Date(new_timestamp) > new Date(old_timestamp)) {
        data[product_id].remaining = index;
      }
    } else {
      data[product_id] = {
        _id: product_id,
        name: product_name,
        sold: sold_quantity,
        remaining: index, // save the index of the purchase with the nearest timestamp
      };
    }
  });

  // loop over Data to replace remaining_quantity index with the actual quantity
  const result = Object.values(data);
  result.forEach((product) => {
    product.remaining = purchases[product.remaining].productId.quantity;
  });

  return result;
}
