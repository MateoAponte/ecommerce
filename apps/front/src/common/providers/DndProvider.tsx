import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { useCartDraggable } from '../hooks/useDraggable';
import { Box, Typography } from '@mui/material';

export const DndProvider = ({ children }: { children: React.ReactNode }) => {
  const { handleDragStart, handleDragEnd, dragging } = useCartDraggable();

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}

      {/* Ghost card que sigue al cursor mientras arrastra */}
      <DragOverlay>
        {dragging && (
          <div
            style={{
              opacity: 0.85,
              transform: 'rotate(2deg)',
              pointerEvents: 'none',
              width: 172,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: '#ffffff',
                border: '1.5px solid #005db9',
                borderRadius: 14,
                padding: '10px 16px 10px 10px',
                width: 220,
                transform: 'rotate(2deg)',
                pointerEvents: 'none',
                cursor: 'grabbing',
              }}
            >
              {/* Imagen */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  flexShrink: 0,
                  borderRadius: '10px',
                  background: '#f0f4f8',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src={dragging.image}
                  alt={dragging.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '4px',
                  }}
                />
              </Box>

              {/* Info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {dragging.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 13, fontWeight: 500, color: '#005db9', mt: '3px' }}
                >
                  500000
                </Typography>
              </Box>

              {/* Ícono animado */}
              <i
                className="fa-solid fa-shopping-cart"
                style={{
                  fontSize: 18,
                  color: 'var(--accent)',
                  flexShrink: 0,
                  animation: 'cartSwing .6s ease infinite alternate',
                }}
              ></i>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};
