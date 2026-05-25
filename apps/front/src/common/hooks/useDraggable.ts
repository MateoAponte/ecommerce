import { useState } from 'react';
import { useAppStore } from '../store/store';
import type { IProduct } from '../../features/shopping/types/Product';
import type { DragEndEvent } from '@dnd-kit/core';

export const useCartDraggable = () => {
  const [dragging, setDragging] = useState<IProduct>();
  const { items, addItem } = useAppStore((state) => state);

  const handleDragStart = ({ active }: any) => {
    setDragging(active.data.current.product);
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    setDragging(undefined);

    if (over?.id !== 'cart-drop-zone') return;

    const product = active.data.current?.product as IProduct;
    if (!product) return;

    const alreadyInCart = items.some((i) => i.id === product.id);
    if (!alreadyInCart) addItem(product);
  };

  return {
    handleDragStart,
    handleDragEnd,
    dragging,
  };
};
