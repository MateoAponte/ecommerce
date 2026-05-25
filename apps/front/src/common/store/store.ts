import { create } from 'zustand';
import { createAuthSlice } from '../../auth/store/auth.slice';
import type { IAuthSlice } from '../../auth/store/interfaces';
import { createProductSlice } from '../../features/shopping/store/shopping.slice';
import type { IProductSlice } from '../../features/shopping/store/interfaces/IProductSlice';
import { persist, createJSONStorage } from 'zustand/middleware';

type AppStore = IAuthSlice & IProductSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
      ...createProductSlice(...args),
    }),
    {
      name: 'gapsi-store',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
