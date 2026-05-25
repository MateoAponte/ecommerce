import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useAppStore } from '../../../common/store/store';

export const OrderProcessingPage = () => {
  const navigate = useNavigate();
  const { reset } = useAppStore((state) => state);

  useEffect(() => {
    reset(); // vacía el carrito al confirmar
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        background: '#f8fafc',
      }}
    >
      {/* Ícono animado */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#ecfdf5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 1.8s ease infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'scale(1)',
              boxShadow: '0 0 0 0 rgba(16,185,129,0.3)',
            },
            '50%': {
              transform: 'scale(1.05)',
              boxShadow: '0 0 0 12px rgba(16,185,129,0)',
            },
          },
        }}
      >
        <i
          className="fa-solid fa-bag-shopping"
          style={{ fontSize: 32, color: '#10b981' }}
        ></i>
      </Box>

      <Box sx={{ textAlign: 'center', maxWidth: 360 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#0e0e0e' }}>
          ¡Compra en proceso!
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#777', mt: '8px', lineHeight: 1.6 }}>
          Tu pedido está siendo procesado. Te notificaremos cuando esté confirmado.
        </Typography>
      </Box>

      {/* Steps */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', mt: '8px' }}>
        {['Pedido recibido', 'En proceso', 'Confirmado'].map((step, i) => (
          <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: i === 0 ? '#005db9' : i === 1 ? '#e6f0fb' : '#f1f5f9',
                  color: i === 0 ? '#fff' : i === 1 ? '#005db9' : '#c8c8c8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  animation: i === 1 ? 'pulse 1.8s ease infinite' : 'none',
                }}
              >
                {i === 0 ? (
                  <i className="fa-solid fa-check" style={{ fontSize: 11 }}></i>
                ) : i === 1 ? (
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 11 }}></i>
                ) : (
                  <i className="fa-solid fa-clock" style={{ fontSize: 11 }}></i>
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: 10,
                  color: i === 0 ? '#005db9' : '#a0a0a0',
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {step}
              </Typography>
            </Box>
            {i < 2 && (
              <Box sx={{ width: 32, height: 1, background: '#e2e8f0', mb: '18px' }} />
            )}
          </Box>
        ))}
      </Box>

      <Button
        onClick={() => navigate('/ecommerce')}
        sx={{
          mt: '8px',
          borderRadius: '10px',
          textTransform: 'none',
          color: '#005db9',
          fontWeight: 600,
          fontSize: 13,
          border: '1.5px solid #005db9',
          padding: '8px 24px',
          '&:hover': { background: '#e6f0fb' },
        }}
      >
        Seguir comprando
      </Button>
    </Box>
  );
};
