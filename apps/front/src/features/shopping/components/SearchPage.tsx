import { ProductCard } from '../components/ProductCard';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useAppStore } from '../../../common/store/store';
import { useInfiniteScroll } from '../../../common/hooks/useInfiniteScroll';
import { BaseProductCard } from './BaseProductCard';
import type { IProduct } from '../types/Product';

interface SearchPageProps {
  products: IProduct[];
  isLoading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onSelectProduct: (p: IProduct) => void;
}

export const SearchPage = ({
  products,
  isLoading,
  hasNextPage,
  onLoadMore,
  onSelectProduct,
}: SearchPageProps) => {
  const { items } = useAppStore((state) => state);

  const { sentinelRef } = useInfiniteScroll({
    onLoadMore,
    hasNextPage,
    isLoading,
  });

  const visible = products.filter((p) => !items.some((i) => i.id === p.id));

  return (
    <div className="container py-3">
      <div className="row g-3">
        {/* Lista */}
        <div className="w-100 text-center">
          {/* Skeleton primera carga */}
          {isLoading && (
            <div className="row g-3 mt-1 gap-4 justify-content-center">
              {[...Array(6)].map((_, i) => (
                <BaseProductCard key={i} product={null} onAddToCart={() => {}}>
                  {({ product, onAddToCart }) => (
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  )}
                </BaseProductCard>
              ))}
            </div>
          )}

          {/* Grid de productos */}
          {!isLoading && (
            <div className="row g-3 mt-1 gap-4 justify-content-center">
              {visible.map((product, i) => (
                <BaseProductCard
                  key={i}
                  product={product}
                  onAddToCart={() => onSelectProduct(product)}
                  onDetail={() => onSelectProduct(product)}
                >
                  {({ product, onAddToCart }) => (
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  )}
                </BaseProductCard>
              ))}
            </div>
          )}

          {/* Sentinel — dispara loadMore al llegar aquí */}
          <div ref={sentinelRef} style={{ height: 32 }} />
          {hasNextPage && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                py: 3,
              }}
            >
              <CircularProgress size={20} sx={{ color: '#005db9' }} />
              <Typography sx={{ fontSize: 12, color: '#a0a0a0' }}>
                Loading more products...
              </Typography>
            </Box>
          )}

          {/* Spinner páginas siguientes */}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress size={28} sx={{ color: 'var(--accent)' }} />
            </Box>
          )}

          {/* Fin de resultados */}
          {!hasNextPage && products.length > 0 && !isLoading && (
            <Typography
              sx={{ textAlign: 'center', py: 3, fontSize: 12, color: '#a0a0a0' }}
            >
              Todos los productos cargados
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
