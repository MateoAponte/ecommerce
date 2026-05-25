import type { IProduct } from '../../../types/Product';

export interface IProductRequest {
  criteria: string;
  page: number;
}

export interface IProduceResponse {
  products: IProduct[];
  total: number;
}
