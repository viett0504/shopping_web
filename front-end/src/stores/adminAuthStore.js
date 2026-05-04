import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminAuthService } from '../services/adminAuthService';

const useAdminAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      admin: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const response = await adminAuthService.login(email, password);
          set({
            accessToken: response.accessToken,
            admin: response.user,
            isAuthenticated: true,
          });
          return response;
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        set({
          accessToken: null,
          admin: null,
          isAuthenticated: false,
        });
      },

      checkAuth: () => {
        const { accessToken } = get();
        return !!accessToken;
      },
    }),
    {
      name: 'admin-auth-storage',
    }
  )
);

export { useAdminAuthStore };
export default useAdminAuthStore;
