import type { StateCreator } from 'zustand';
import type { IProductSlice } from './interfaces/IProductSlice';
import type { IProduct } from '../types/Product';

export const createProductSlice: StateCreator<IProductSlice> = (set) => ({
  items: [],
  addItem: (item: IProduct) => {
    set((state) => ({
      items: [...state.items, item],
    }));
  },
  removeItem: (item: IProduct) => {
    set((state) => ({
      items: state.items.filter((p) => p.id !== item.id),
    }));
  },
  reset: () => {
    set({
      items: [],
    });
  },
});
