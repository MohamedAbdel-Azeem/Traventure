export interface ACTUALProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  seller: object;
  externalseller: string;
  imageUrl: string;
  quantity: number;
  feedback: {
    name: string;
    rating: string;
    review: string;
  }[];
  isArchived: boolean;
}
