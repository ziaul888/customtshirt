import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UIStore } from './types';

export const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      selectedDesign: 'text',
      sidebarOpen: true,

      // Actions
      setSelectedDesign: (design) => {
        set({ selectedDesign: design }, false, 'setSelectedDesign');
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open }, false, 'setSidebarOpen');
      },

      handleDesignSelect: (design) => {
        set({ selectedDesign: design }, false, 'handleDesignSelect');
      },
    }),
    {
      name: 'ui-store',
    }
  )
);