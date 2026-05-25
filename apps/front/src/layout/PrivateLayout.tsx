import { Outlet } from 'react-router-dom';
import { PublicHeader } from '../common/components/PublicHeader';
import { PublicFooter } from '../common/components/PublicFooter';
import { DndProvider } from '../common/providers/DndProvider';

export const PrivateLayout = () => {
  return (
    <DndProvider>
      <div style={{ minHeight: '100vh' }}>
        <PublicHeader />
        <section style={{ height: 'calc(100vh - 90px)', overflow: 'auto' }}>
          <Outlet />
        </section>
        <PublicFooter />
      </div>
    </DndProvider>
  );
};
