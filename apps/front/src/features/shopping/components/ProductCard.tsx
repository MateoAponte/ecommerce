import { Box, Button, CardActions, CardContent, CardMedia, Divider } from '@mui/material';
import type { IProduct } from '../types/Product';
import { useDraggable } from '@dnd-kit/core';
import { CardSkeleton } from './CardSkeleton';

type ProductCardProps = {
  product: IProduct | null;
  loading?: boolean;
  actionLabel?: string;
  onAddToCart?: () => void;
};

export const ProductCard = ({
  product,
  loading,
  actionLabel = 'Add to cart',
  onAddToCart,
}: ProductCardProps) => {
  if (!product || loading) return <CardSkeleton />;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: { product }, // payload que recibe DndContext en dragEnd
  });

  const inStock = product.availability === 'IN_STOCK';

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: 172,
          background: '#f8fafc',
          overflow: 'hidden',
          opacity: isDragging ? 0 : 1,
          transition: isDragging ? 'none' : 'opacity .2s',
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: '100%',
            objectFit: 'contain',
            padding: '16px',
            transition: 'transform .3s ease',
            '.MuiCard-root:hover &': { transform: 'scale(1.05)' },
          }}
        />

        {/* Categoría — top left */}
        {product.category && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'rgba(0,93,185,0.88)',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '.05em',
              padding: '3px 10px',
              borderRadius: '20px',
              textTransform: 'uppercase',
            }}
          >
            {product.category}
          </Box>
        )}

        {/* Availability — bottom left */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            background: inStock ? '#ecfdf5' : '#fef2f2',
            color: inStock ? '#047857' : '#dc2626',
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '20px',
          }}
        >
          ● {inStock ? 'In stock' : 'Out of stock'}
        </Box>

        {/* Drag handle — top right */}
        <Box
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: '#fff',
            border: '1px dashed #005db9',
            color: '#005db9',
            borderRadius: '20px',
            padding: '3px 8px',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <i className="fa-solid fa-up-down-left-right"></i>
        </Box>
      </Box>

      {/* SLOT: cuerpo */}
      <CardContent sx={{ padding: '14px 14px 0' }}>
        {/* catalogProductType como sublabel */}
        {product.catalogProductType && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 500,
              color: '#a0a0a0',
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              marginBottom: '4px',
            }}
          >
            {product.catalogProductType}
          </span>
        )}

        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#0e0e0e',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4em',
          }}
        >
          {product.name}
        </span>

        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#005db9',
            letterSpacing: '-.02em',
            marginTop: '8px',
          }}
        >
          {product.price}
        </span>

        {/* Rating */}
        {product.rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', mt: '5px' }}>
            <Box sx={{ color: '#f59e0b', fontSize: '12px' }}>
              {'★'.repeat(Math.floor(product.rating.averageRating))}
              {product.rating.averageRating % 1 >= 0.5 ? '½' : ''}
            </Box>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>
              {product.rating.averageRating.toFixed(1)}
            </span>
            {product.rating.numberOfReviews && (
              <span style={{ fontSize: '11px', color: '#a0a0a0' }}>
                ({product.rating.numberOfReviews.toLocaleString()})
              </span>
            )}
          </Box>
        )}
      </CardContent>

      {/* SLOT: acciones */}
      <CardActions sx={{ padding: '12px 14px 14px', flexDirection: 'column' }}>
        <Divider
          sx={{
            mb: '12px',
            borderColor: 'var(--border)',
            width: '100%',
            height: '1px',
            opacity: 1,
          }}
        />
        <Button
          variant="outlined"
          fullWidth
          disabled={!inStock}
          startIcon={
            <i className="fa-solid fa-cart-shopping" style={{ fontSize: 13 }}></i>
          }
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.();
          }}
          sx={{
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '.04em',
            textTransform: 'uppercase',
            padding: '9px 0',
            boxShadow: 'none',
            ...(inStock
              ? {
                  borderColor: '#005db9',
                  color: '#005db9',
                  '&:hover': { background: '#005db9', color: '#fff', boxShadow: 'none' },
                }
              : {
                  borderColor: '#c8c8c8',
                  color: '#a0a0a0',
                }),
            '&:active': { transform: 'scale(0.98)' },
          }}
        >
          {inStock ? actionLabel : 'Out of stock'}
        </Button>
      </CardActions>
    </>
  );
};
