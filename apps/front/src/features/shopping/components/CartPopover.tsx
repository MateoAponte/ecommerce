import { Popover, Box, Button, IconButton } from '@mui/material';
import type { IProduct } from '../types/Product';
import { BaseProductCard } from './BaseProductCard';
import { ProductCartPreview } from './ProductCardPreview';

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onConfirm: () => void;
  items: IProduct[];
  removeItem: (item: IProduct) => void;
}

export const CartPopover = ({
  anchorEl,
  onClose,
  onConfirm,
  items,
  removeItem,
}: Props) => {
  // const total = items.reduce((acc: IProduct, p) => acc + Number(p.price), 0);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          borderBottom: '0.5px solid #e2e8f0',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i
            className="fa-solid fa-cart-shopping"
            style={{ color: '#005db9', fontSize: 14 }}
          ></i>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0e0e0e' }}>Cart</span>
          <Box
            sx={{
              background: '#005db9',
              color: '#fff',
              borderRadius: '20px',
              fontSize: 11,
              fontWeight: 700,
              padding: '1px 8px',
            }}
          >
            {items.length}
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ borderRadius: '8px', border: '0.5px solid #e2e8f0' }}
        >
          <i className="fa-solid fa-xmark" style={{ fontSize: 12 }}></i>
        </IconButton>
      </Box>

      {/* Items con scroll */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-thumb': { background: '#e2e8f0', borderRadius: 4 },
        }}
      >
        {items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, color: '#a0a0a0' }}>
            <i className="fa-solid fa-bag-shopping" style={{ fontSize: 28 }}></i>
            <span style={{ fontSize: 13, marginTop: 1 }}>Tu carrito está vacío</span>
          </Box>
        ) : (
          items.map((product: IProduct) => (
            <BaseProductCard
              key={product.id}
              product={product}
              onRemoveToCart={() => removeItem(product)}
            >
              {({ product, onRemoveToCart }) => (
                <ProductCartPreview
                  product={product}
                  onRemove={() => onRemoveToCart && onRemoveToCart()}
                />
              )}
            </BaseProductCard>
          ))
        )}
      </Box>

      {/* Footer */}
      {items.length > 0 && (
        <Box
          sx={{ flexShrink: 0, borderTop: '0.5px solid #e2e8f0', padding: '12px 16px' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '12px' }}>
            <span style={{ fontSize: 13, color: 'var(--code-bg)' }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>
              50000
            </span>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            onClick={onConfirm}
            sx={{
              borderColor: 'var(--accent)',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: 13,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                boxShadow: 'none',
              },
            }}
          >
            <i className="fa-solid fa-lock" style={{ marginRight: 8, fontSize: 12 }}></i>
            Confirm Shopping Cart
          </Button>
        </Box>
      )}
    </Popover>
  );
};
