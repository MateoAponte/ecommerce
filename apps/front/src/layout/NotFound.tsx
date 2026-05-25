import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import GapsiLogo from '../common/resources/logo.png';

export const NotFoundPage = () => {
  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <Paper
        elevation={4}
        className="d-flex flex-column align-items-center text-center p-5 rounded-4"
        sx={{
          width: '100%',
          maxWidth: 420,
          minHeight: 520,
        }}
      >
        <img
          src={GapsiLogo}
          alt="APSI Integration"
          className="mb-4"
          style={{ width: 150 }}
        />

        <Typography
          variant="h1"
          className="fw-bold mb-2"
          sx={{ fontSize: 72, color: 'text.primary' }}
        >
          404
        </Typography>

        <Typography variant="h5" className="fw-semibold fs-4" sx={{ marginBottom: 4 }}>
          Page not found.
        </Typography>

        <span className="text-muted">
          The page you are looking for doesn&apos;t exist or has been moved.
        </span>

        <div className="mt-auto w-100">
          <Button
            component={Link}
            to="/auth"
            variant="outlined"
            fullWidth
            sx={{ py: 1.2 }}
          >
            Back to login
          </Button>
        </div>
      </Paper>
    </main>
  );
};
