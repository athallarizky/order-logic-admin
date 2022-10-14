import create from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IFilterList {
  no_tiket?: string;
  no_internet?: string;
  code_sto?: string;
  loker?: string;
  agen_hi?: string;
  keterangan?: string;
  tanggal?: string;
}

export interface FilterState {
  filterList: IFilterList;
  setFilterList: (item: IFilterList) => void;
}

const useFilterStore = create<FilterState>(set => ({
  filterList: {},
  setFilterList: item => {
    set(oldState => ({
      filterList: { ...oldState.filterList, item },
    }));
  },
}));

export default useFilterStore;
