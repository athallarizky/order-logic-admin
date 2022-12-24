import create from 'zustand';
import { combine, persist, devtools } from 'zustand/middleware';

interface IUserData {
  created_at: string;
  name: string;
  level: string;
  national_identity_number: string;
}

export interface UserState {
  userData: IUserData;
  token: string;
  setUserData: (data: IUserData) => void;
  setToken: (tokenData: string) => void;
}

const useUserStore = create<any>(
  devtools(
    persist(
      set => ({
        userData: {
          created_at: '',
          name: '',
          level: '',
          national_identity_number: '',
        },
        token: '',
        setToken: tokenData => {
          set(() => ({
            token: tokenData,
          }));
        },
        setUserData: userData => {
          set(() => ({
            userData,
          }));
        },
      }),
      {
        name: 'auth-storage',
        getStorage: () => localStorage,
      },
    ),
  ),
);

export default useUserStore;
