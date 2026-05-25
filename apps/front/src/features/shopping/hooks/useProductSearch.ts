import { useState, useCallback, useRef } from 'react';
import type { IProduct } from '../types/Product';
import { ProductService } from '../service/products/product.service';

export const useProductSearch = () => {
  const isSearching = useRef(false);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const search = useCallback(async (kw: string) => {
    if (kw.trim() === '' || isSearching.current) return;
    isSearching.current = true;
    setKeyword(kw);
    setPage(1);
    setProducts([]);
    setIsLoading(true);

    try {
      const data = await ProductService.loadProducts({
        criteria: kw,
        page: 1,
      });
      console.log(data);

      setProducts(data.products);
      setTotalPages(data.total);
    } catch (err) {
      console.error('useProductSearch.search:', err);
    } finally {
      setIsLoading(false);
      isSearching.current = false;
    }
  }, []);

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    if (nextPage > totalPages || isLoadingMore) return;

    setIsLoadingMore(true);
    setPage(nextPage);

    try {
      const data = await ProductService.loadProducts({
        criteria: keyword,
        page: nextPage,
      });
      console.log(data);

      setProducts((prev) => [...prev, ...data.products]);
    } catch (err) {
      console.error('useProductSearch.loadMore:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, totalPages, keyword, isLoadingMore]);

  const hasNextPage = page < totalPages;

  return {
    products,
    isLoading,
    isLoadingMore,
    hasNextPage,
    search,
    loadMore,
  };
};
