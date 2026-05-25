import { Card, CardActions, CardContent, Skeleton } from '@mui/material';

export const CardSkeleton = () => {
  return (
    <Card elevation={0} sx={{ border: `1px solid var(--border)`, borderRadius: '12px' }}>
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{ borderRadius: '12px 12px 0 0' }}
      />
      <CardContent>
        <Skeleton variant="text" height={18} width="90%" />
        <Skeleton variant="text" height={18} width="60%" />
        <Skeleton variant="text" height={24} width="40%" sx={{ mt: 1 }} />
      </CardContent>
      <CardActions sx={{ padding: '8px 16px 14px', justifyContent: 'flex-end' }}>
        <Skeleton variant="rounded" width={40} height={32} />
      </CardActions>
    </Card>
  );
};
