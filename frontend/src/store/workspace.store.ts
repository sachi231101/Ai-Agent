import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceState {
  activeOrganizationId: string | null;
  recentAgents: string[];
  setActiveOrganization: (id: string | null) => void;
  addRecentAgent: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      activeOrganizationId: null,
      recentAgents: [],
      setActiveOrganization: (activeOrganizationId) => set({ activeOrganizationId }),
      addRecentAgent: (id) =>
        set((s) => ({
          recentAgents: [id, ...s.recentAgents.filter((a) => a !== id)].slice(0, 10),
        })),
    }),
    { name: 'workspace-store' }
  )
);
