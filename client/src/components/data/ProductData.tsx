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
    touristId: string;
    rating: string;
    review: string;
    touristUsername?: string;
  }[];
  isArchived: boolean;
}
