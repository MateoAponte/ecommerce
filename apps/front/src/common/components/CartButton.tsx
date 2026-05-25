import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { Badge, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppStore } from '../store/store';
import { CartPopover } from '../../features/shopping/components/CartPopover';
import { useNavigate } from 'react-router';

type CartButtonProps = {
  count?: number;
  onClose: () => void;
};

export const CartButton = ({ count = 0, onClose }: CartButtonProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: 'cart-drop-zone' });
  const [isDragging, setIsDragging] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { items, removeItem, isAuthenticated } = useAppStore((state) => state);
  const navigate = useNavigate();

  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDragCancel: () => setIsDragging(false),
  });

  const handleConfirm = () => {
    setAnchorEl(null);
    onClose();
    if (isAuthenticated) {
      navigate('/order-processing');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        ref={setNodeRef}
        aria-label="Shopping cart"
        className="bg-white shadow-sm"
        sx={{
          color: isOver ? '#000' : 'var(--accent)',
          background: isOver ? 'var(--accent)' : '#fff',
          border: `2px dashed ${isDragging ? 'var(--accent)' : 'transparent'}`,
          transition: 'all .18s ease',
          transform: isOver ? 'scale(1.12)' : 'scale(1)',
          borderRadius: '10px',
        }}
      >
        <Badge badgeContent={count} color="error">
          {!isOver ? <i className="fa-solid fa-cart-shopping fs-5"></i> : ``}

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              p: 0.2,
              color: isOver ? 'var(--accent)' : '#777',
              opacity: 1,
              transform: isDragging ? 'translateY(0)' : 'translateY(-4px)',
            }}
          >
            {isOver ? (
              <>
                <i className="fa-solid fa-circle-plus"></i>
                <br />
                <span>¡Drop here!</span>
              </>
            ) : (
              ``
            )}
          </Typography>
        </Badge>
      </IconButton>
      <CartPopover
        items={items}
        removeItem={removeItem}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onConfirm={() => handleConfirm()}
      />
    </>
  );
};
