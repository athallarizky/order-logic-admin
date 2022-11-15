import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import Knex from 'knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const parsedData = JSON.parse(req.body);
  const { data } = parsedData;
  // console.log('typeof req.body====================================', data.no_tiket);

  const filteredData = await dbConfig('close_wo_table')
    .select(
      'close_wo_table.id',
      'no_tiket',
      'source',
      'sto_table.sto_name as sto',
      'no_internet',
      'no_telp',
      'agent_table.name_agent as agent',
      'jenis_gangguan_table.jenis_gangguan as jenis_gangguan',
      'detail_gangguan',
      'perbaikan',
      'tanggal',
      'close_wo_table.created_at',
      dbConfig.raw("DATE_FORMAT(tanggal, '%Y-%m-%d') as tanggal"),
    )
    .join('sto_table', 'sto_table.id', '=', 'close_wo_table.id_sto')
    .join('agent_table', 'agent_table.id', '=', 'close_wo_table.id_agent')
    .join('jenis_gangguan_table', 'jenis_gangguan_table.id', '=', 'close_wo_table.id_gangguan')
    .where('close_wo_table.no_tiket', `${data.no_tiket}`)
    .orWhere('close_wo_table.no_internet', `${data.no_internet}`)
    .orWhere('close_wo_table.no_telp', `${data.no_telp}`)
    .orWhere('close_wo_table.id_sto', `${data.id_sto}`)
    .orWhere('close_wo_table.source', `${data.source}`)
    .orWhere('close_wo_table.id_agent', `${data.id_agent}`)
    .orWhere('close_wo_table.id_gangguan', `${data.id_gangguan}`)
    .orWhere('close_wo_table.detail_gangguan', `${data.detail_gangguan}`)
    .orWhere('close_wo_table.perbaikan', `${data.perbaikan}`)
    .orWhere('close_wo_table.tanggal', `${data.tanggal}`);

  return res.status(200).json({
    message: 'Filter Success',
    data: filteredData,
  });
}
