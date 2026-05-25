import { Paper } from '@mui/material';
import { CartButton } from './CartButton';

import GapsiLogo from '../resources/logo.png';
import { useAppStore } from '../store/store';

export const PublicHeader = () => {
  const { items } = useAppStore((state) => state);

  const handleClose = () => {
    console.log('Close');
  };

  return (
    <Paper
      component="header"
      elevation={2}
      square
      className="w-100 bg-white"
      sx={{
        position: 'relative',
        zIndex: 20,
      }}
    >
      <nav className="container d-flex align-items-center justify-content-between py-2">
        <a href="/ecommerce" className="d-inline-flex align-items-center">
          <img
            src={GapsiLogo}
            alt="APSI Integración"
            className="img-fluid"
            style={{
              width: 'clamp(110px, 16vw, 170px)',
              maxHeight: 72,
              objectFit: 'contain',
            }}
          />
        </a>

        <div className="d-flex align-items-center gap-3">
          <CartButton onClose={handleClose} count={items.length} />
        </div>
      </nav>
    </Paper>
  );
};
