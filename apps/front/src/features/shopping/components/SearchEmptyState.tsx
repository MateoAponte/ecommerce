import { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';

const TAGS = [
  { label: 'Electronics', icon: 'fa-laptop', kw: 'electronics' },
  { label: 'Appliances', icon: 'fa-blender', kw: 'appliances' },
  { label: 'Food', icon: 'fa-apple-whole', kw: 'food' },
  { label: 'Toys', icon: 'fa-puzzle-piece', kw: 'toys' },
  { label: 'Tools', icon: 'fa-screwdriver-wrench', kw: 'tools' },
  { label: 'Consoles', icon: 'fa-gamepad', kw: 'consoles' },
  { label: 'Furniture', icon: 'fa-couch', kw: 'furniture' },
  { label: 'Clothing', icon: 'fa-shirt', kw: 'clothing' },
  { label: 'Sports', icon: 'fa-football', kw: 'sports' },
  { label: 'Beauty', icon: 'fa-spa', kw: 'beauty' },
  { label: 'Books', icon: 'fa-book', kw: 'books' },
  { label: 'Garden', icon: 'fa-seedling', kw: 'garden' },
];

interface Props {
  onSelect: (kw: string) => void;
  activeKw?: string;
}

export const SearchEmptyState = ({ onSelect, activeKw }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dx: number) => {
    scrollRef.current?.scrollBy({ left: dx, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        py: 6,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: 22, fontWeight: 600, color: '#0e0e0e' }}>
          ¿Qué quieres buscar hoy?
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#a0a0a0', mt: '4px' }}>
          Selecciona una categoría o escribe en el buscador
        </Typography>
      </Box>

      {/* Tags con scroll horizontal */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 640 }}>
        {/* Flecha izquierda */}
        <IconButton
          onClick={() => scroll(-200)}
          size="small"
          sx={{
            position: 'absolute',
            left: -16,
            top: '50%',
            transform: 'translateY(-60%)',
            zIndex: 2,
            background: '#fff',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&:hover': { borderColor: '#005db9', color: '#005db9' },
          }}
        >
          <i className="fa-solid fa-chevron-left" style={{ fontSize: 12 }}></i>
        </IconButton>

        {/* Tags */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            padding: '4px 2px 8px',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {TAGS.map(({ label, icon, kw }) => {
            const isActive = activeKw === kw;
            return (
              <Box
                key={kw}
                onClick={() => onSelect(kw)}
                sx={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: `1.5px solid ${isActive ? '#005db9' : '#e2e8f0'}`,
                  background: isActive ? '#005db9' : '#fff',
                  color: isActive ? '#fff' : '#334155',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all .16s ease',
                  userSelect: 'none',
                  '&:hover': {
                    borderColor: '#005db9',
                    color: isActive ? '#fff' : '#005db9',
                    background: isActive ? '#005db9' : '#e6f0fb',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <i className={`fa-solid ${icon}`} style={{ fontSize: 13 }}></i>
                {label}
              </Box>
            );
          })}
        </Box>

        {/* Flecha derecha */}
        <IconButton
          onClick={() => scroll(200)}
          size="small"
          sx={{
            position: 'absolute',
            right: -16,
            top: '50%',
            transform: 'translateY(-60%)',
            zIndex: 2,
            background: '#fff',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&:hover': { borderColor: '#005db9', color: '#005db9' },
          }}
        >
          <i className="fa-solid fa-chevron-right" style={{ fontSize: 12 }}></i>
        </IconButton>
      </Box>
    </Box>
  );
};
