import type { IProduct } from '../../types/Product';

export interface IProductSlice {
  addItem: (item: IProduct) => void;
  removeItem: (item: IProduct) => void;
  reset: () => void;
  items: IProduct[];
}
