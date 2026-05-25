import { Card } from '@mui/material';
import type { IProduct } from '../types/Product';

export const BaseProductCard = ({
  product,
  onAddToCart,
  sx = {},
  children,
  onDetail,
  onRemoveToCart,
}: {
  product: IProduct | null;
  onAddToCart?: () => void;
  sx?: any;
  children: (props: {
    product: IProduct | null;
    onAddToCart?: () => void;
    onRemoveToCart?: () => void;
  }) => React.ReactNode;
  onDetail?: () => void;
  onRemoveToCart?: () => void;
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid var(--border)`,
        borderRadius: '12px',
        boxShadow: 'var(--shadow)',
        transition: 'box-shadow 0.22s ease, transform 0.22s ease',
        cursor: 'grab',
        background: '#fff',
        '&:hover': {
          boxShadow: 'var(--shadow-hover)',
          transform: 'translateY(-3px)',
          borderColor: 'var(--accent)',
        },
        '&:active': { cursor: 'grabbing' },
        ...sx,
      }}
      className="col-6 col-lg-3"
      onClick={() => onDetail && onDetail()}
    >
      {children({ product, onAddToCart, onRemoveToCart })}
    </Card>
  );
};
