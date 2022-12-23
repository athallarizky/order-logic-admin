import create from 'zustand';
import { combine, persist } from 'zustand/middleware';

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
}

const useUserStore = create<UserState>(set => ({
  userData: {
    created_at: '',
    name: '',
    level: '',
    national_identity_number: '',
  },
  token: '',
  setToken: data => {
    set(() => ({
      token: data,
    }));
  },
  setUserData: data => {
    set(oldState => ({
      userData: { ...oldState.userData, data },
    }));
  },
}));

export default useUserStore;
