import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <main style={{ height: '100%' }}>
      <section style={{ height: '100%' }}>
        <Outlet />
      </section>
    </main>
  );
};
