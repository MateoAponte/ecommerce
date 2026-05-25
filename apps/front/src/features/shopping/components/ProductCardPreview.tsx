import { Box, Typography, IconButton } from '@mui/material';
import type { IProduct } from '../types/Product';

interface Props {
  product: IProduct | null;
  onRemove: () => void;
}

export const ProductCartPreview = ({ product, onRemove }: Props) => {
  if (!product) return <></>;

  const inStock = product.availability === 'IN_STOCK';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 0',
      }}
    >
      {/* Imagen */}
      <Box
        sx={{
          width: 64,
          height: 64,
          flexShrink: 0,
          background: '#f8fafc',
          borderRadius: '10px',
          border: '0.5px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={product.thumbnail || product.image}
          alt={product.name}
          sx={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
        />
      </Box>

      {/* Info */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}
      >
        {/* Category + Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {product.category && (
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#005db9',
                textTransform: 'uppercase',
                letterSpacing: '.04em',
              }}
            >
              {product.category}
            </Typography>
          )}
          {product.brand && (
            <>
              <Box
                sx={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#c8c8c8',
                  flexShrink: 0,
                }}
              />
              <Typography sx={{ fontSize: '10px', color: '#a0a0a0' }}>
                {product.brand}
              </Typography>
            </>
          )}
        </Box>

        {/* Nombre */}
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: '#0e0e0e',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </Typography>

        {/* Department */}
        {product.department && (
          <Typography sx={{ fontSize: '11px', color: '#a0a0a0' }}>
            {product.department}
          </Typography>
        )}

        {/* Price + availability */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: '4px',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#005db9',
              letterSpacing: '-.01em',
            }}
          >
            ${product.priceValue}
          </Typography>
          <Box
            sx={{
              fontSize: '10px',
              fontWeight: 700,
              color: inStock ? '#047857' : '#dc2626',
              background: inStock ? '#ecfdf5' : '#fef2f2',
              padding: '2px 8px',
              borderRadius: '20px',
            }}
          >
            ● {inStock ? 'In stock' : 'Out of stock'}
          </Box>
        </Box>
      </Box>

      {/* Quitar */}
      <IconButton
        size="small"
        onClick={onRemove}
        sx={{
          flexShrink: 0,
          borderRadius: '8px',
          color: '#a0a0a0',
          mt: '-2px',
          '&:hover': { color: '#dc2626', background: '#fef2f2' },
        }}
      >
        <i className="fa-solid fa-trash-can" style={{ fontSize: 12 }}></i>
      </IconButton>
    </Box>
  );
};
