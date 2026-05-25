import { Outlet } from 'react-router';
import { PublicHeader } from '../common/components/PublicHeader';
import { DndProvider } from '../common/providers/DndProvider';
import { PublicFooter } from '../common/components/PublicFooter';

export const EcommerceLayout = () => {
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
