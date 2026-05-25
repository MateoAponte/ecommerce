import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ProductDetailModal } from '../components/DetailModal';
import type { IProduct } from '../types/Product';
import { useProductSearch } from '../hooks/useProductSearch';
import { useDebounce } from '../../../common/hooks/useDebounce';
import { SearchPage } from '../components/SearchPage';
import { SearchEmptyState } from '../components/SearchEmptyState';
import { Box } from '@mui/material';

export const Shopping = () => {
  const [search, setSearch] = useState('');
  const {
    products,
    isLoading,
    hasNextPage,
    search: searchFn,
    loadMore,
  } = useProductSearch();
  const [selected, setSelected] = useState<IProduct | null>(null);
  const [activeTag, setActiveTag] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleTagSelect = (kw: string) => {
    setSearch(kw);
    setActiveTag(kw);
    setHasSearched(true);
    searchFn(kw);
  };

  const handleSearch = (kw: string) => {
    setHasSearched(true);
    setActiveTag('');
    searchFn(kw);
  };

  useDebounce(search, searchFn, 500);

  return (
    <>
      <div className="container py-5 d-flex w-full">
        <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
      </div>
      {!isLoading &&
        products.length === 0 &&
        (hasSearched ? (
          // Ya buscó y no encontró nada
          <Box sx={{ textAlign: 'center', mt: 8, color: '#a0a0a0' }}>
            <span style={{ fontSize: 32 }}>😞</span>
            <span style={{ marginTop: 1, fontSize: 14 }}>
              ¡Ups! No hay productos disponibles para esta búsqueda
            </span>
          </Box>
        ) : (
          // Primera vez, nunca ha buscado
          <SearchEmptyState onSelect={handleTagSelect} activeKw={activeTag} />
        ))}
      <SearchPage
        products={products}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onLoadMore={loadMore}
        onSelectProduct={setSelected}
      />
      <div style={{ height: '20vh', width: '10vw' }}></div>
      <ProductDetailModal
        product={selected}
        open={true}
        onClose={() => setSelected(null)}
      />
    </>
  );
};
