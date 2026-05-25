export type Availability = 'IN_STOCK' | 'OUT_OF_STOCK' | 'PREORDER';

export interface IRating {
  averageRating: number;
  numberOfReviews: number;
}

export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  availability: Availability;
  brand: string;
  catalogProductType: string;
  department: string;
  rating: IRating;
  thumbnail: string;
}
