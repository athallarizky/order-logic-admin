export interface FormWoDataListResponse {
  no_tiket?: string;
  no_internet?: string;
  tanggal?: string;
  code_sto?: string;
  loker?: string;
  perbaikan?: string;
  agen_hi?: string;
  keterangan?: string;
}

export interface STOList {
  id: number;
  sto_name: string;
  created_at: string;
}

export interface STOListResponse {
  data: STOList[];
}

export interface GangguanLogicList {
  id: number;
  no_tiket: string;
  no_internet: string;
  no_telp: string;
  perbaikan: string;
  source: string;
  sto: string;
  agent: string;
  tanggal: string;
  detail_gangguan: string;
  crated_at: string;
}

export interface JenisGangguanList {
  id: number;
  jenis_gangguan: string;
  created_at: string;
}

export interface JenisGangguanListResponse {
  data: JenisGangguanList[];
}

export interface AgentList {
  id: number;
  name_agent: string;
  created_at: string;
}

export interface AgentListResponse {
  data: AgentList[];
}
