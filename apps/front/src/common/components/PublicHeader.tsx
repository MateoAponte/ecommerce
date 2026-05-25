import { IconButton, Paper, Tooltip } from '@mui/material';
import { CartButton } from './CartButton';

import GapsiLogo from '../resources/logo.png';
import { useAppStore } from '../store/store';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../router/routePaths';

export const PublicHeader = () => {
  const { items } = useAppStore((state) => state);

  const handleClose = () => {
    console.log('Close');
  };

  const navigate = useNavigate();
  const clearSession = useAppStore((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    navigate(ROUTES.auth, { replace: true });
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

          <Tooltip title="Logout">
            <IconButton
              className="bg-white shadow-sm"
              onClick={handleLogout}
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                color: 'var(--accent)',
                transition: 'all .16s',
              }}
            >
              <i className="fa-solid fa-right-from-bracket" style={{ fontSize: 15 }}></i>
            </IconButton>
          </Tooltip>
        </div>
      </nav>
    </Paper>
  );
};
