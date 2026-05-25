import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import type { IProduct } from '../types/Product';
import { useAppStore } from '../../../common/store/store';
import toast from 'react-hot-toast';

interface Props {
  product: IProduct | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDetailModal = ({ product, open, onClose }: Props) => {
  const [wishlist, setWishlist] = useState(false);
  const { addItem, items } = useAppStore((state) => state);

  const handleShare = () => {
    toast.success('Copied to clipboard');
    navigator.clipboard.writeText(window.location.href);
  };

  if (!product) return null;

  const inCart = items.some((i) => i.id === product.id);
  const inStock = product.availability === 'IN_STOCK'; // ajusta al valor real del enum

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '0.5px solid #c8c8c8',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: 13, color: '#777' }}>Product detail</span>
          {product.catalogProductType && (
            <Chip
              label={product.catalogProductType}
              size="small"
              sx={{
                fontSize: '10px',
                height: 18,
                borderRadius: '20px',
                background: '#f1f5f9',
                color: '#64748b',
              }}
            />
          )}
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ borderRadius: '8px', border: '0.5px solid #c8c8c8' }}
        >
          <i className="fa-solid fa-xmark"></i>
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: 0 }}>
        <Box sx={{ display: 'flex' }}>
          {/* Imagen */}
          <Box
            sx={{
              width: 220,
              flexShrink: 0,
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              borderRight: '0.5px solid #c8c8c8',
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ width: '100%', maxWidth: 160, objectFit: 'contain' }}
            />
            {/* Availability badge sobre imagen */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: inStock ? '#ecfdf5' : '#fef2f2',
                color: inStock ? '#047857' : '#dc2626',
                fontSize: '10px',
                fontWeight: 700,
                padding: '3px 12px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}
            >
              ● {inStock ? 'In stock' : 'Out of stock'}
            </Box>
          </Box>

          {/* Info */}
          <Box
            sx={{
              flex: 1,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Category + Department */}
            <Box sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {product.category && (
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    background: '#e6f0fb',
                    color: '#0c447c',
                    fontWeight: 500,
                    fontSize: '11px',
                    height: 22,
                    borderRadius: '20px',
                  }}
                />
              )}
              {product.department && (
                <Chip
                  label={product.department}
                  size="small"
                  sx={{
                    background: '#f1f5f9',
                    color: '#475569',
                    fontWeight: 500,
                    fontSize: '11px',
                    height: 22,
                    borderRadius: '20px',
                  }}
                />
              )}
            </Box>

            {/* Nombre */}
            <span
              style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: '#0e0e0e' }}
            >
              {product.name}
            </span>

            {/* Brand */}
            {product.brand && (
              <span style={{ fontSize: 12, color: '#777' }}>
                by{' '}
                <span style={{ fontWeight: 600, color: '#334155' }}>{product.brand}</span>
              </span>
            )}

            {/* Precio */}
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#005db9',
                letterSpacing: '-.02em',
              }}
            >
              {product.price}
            </span>

            {/* Rating */}
            {product.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Box sx={{ display: 'flex', color: '#f59e0b', fontSize: '13px' }}>
                  {[...Array(Math.floor(product.rating.averageRating))].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                  {product.rating.averageRating % 1 >= 0.5 && (
                    <i className="fa-solid fa-star-half-stroke"></i>
                  )}
                </Box>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0e0e0e' }}>
                  {product.rating.averageRating.toFixed(1)}
                </span>
                {product.rating.numberOfReviews && (
                  <span style={{ fontSize: 12, color: '#a0a0a0' }}>
                    ({product.rating.numberOfReviews.toLocaleString()} reviews)
                  </span>
                )}
              </Box>
            )}

            <Divider sx={{ borderColor: '#c8c8c8' }} />

            {/* Meta fija */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { icon: 'fa-truck', text: 'Free delivery — arrives tomorrow' },
                { icon: 'fa-shield-halved', text: '1-year warranty included' },
                { icon: 'fa-rotate-left', text: 'Free returns within 30 days' },
              ].map(({ icon, text }) => (
                <Box
                  key={text}
                  sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i
                    className={`fa-solid ${icon}`}
                    style={{ fontSize: 13, color: '#a0a0a0', width: 16 }}
                  ></i>
                  <Typography sx={{ fontSize: 12, color: '#777' }}>{text}</Typography>
                </Box>
              ))}
            </Box>

            {/* Acciones */}
            <Box sx={{ display: 'flex', gap: '8px', mt: 'auto', pt: '4px' }}>
              <Button
                variant="outlined"
                fullWidth
                disabled={inCart || !inStock}
                onClick={() => addItem(product)}
                startIcon={
                  !inCart ? (
                    <i className="fa-solid fa-cart-shopping" style={{ fontSize: 13 }}></i>
                  ) : undefined
                }
                sx={{
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  borderColor: inCart
                    ? '#047857'
                    : !inStock
                      ? '#e2e8f0'
                      : 'var(--accent)',
                  '&:hover': {
                    borderColor: inCart ? '#047857' : 'var(--accent)',
                    boxShadow: 'none',
                  },
                  '&.Mui-disabled': {
                    borderColor: inCart ? '#047857' : '#e2e8f0',
                    color: inCart ? '#fff' : '#a0a0a0',
                  },
                }}
              >
                {inCart ? '✓ Added to cart' : !inStock ? 'Out of stock' : 'Add to cart'}
              </Button>

              <Tooltip title="Save to wishlist">
                <IconButton
                  onClick={() => setWishlist((w) => !w)}
                  sx={{
                    borderRadius: '10px',
                    width: 40,
                    height: 40,
                    border: `0.5px solid ${wishlist ? '#fca5a5' : '#c8c8c8'}`,
                    color: wishlist ? '#dc2626' : '#777',
                    fontSize: '14px',
                    transition: 'all .16s',
                  }}
                >
                  <i
                    className={`fa-solid ${wishlist ? 'fa-heart' : 'fa-heart-crack'}`}
                  ></i>
                </IconButton>
              </Tooltip>

              <Tooltip title="Share product">
                <IconButton
                  sx={{
                    borderRadius: '10px',
                    width: 40,
                    height: 40,
                    border: '0.5px solid #c8c8c8',
                    color: '#777',
                    fontSize: '14px',
                  }}
                  onClick={() => handleShare()}
                >
                  <i className="fa-solid fa-share-from-square"></i>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
