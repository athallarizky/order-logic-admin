import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import { sq } from 'date-fns/locale';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  //   const parsedData = JSON.parse(req.body);
  //   const { data } = parsedData.data;
  const { data } = req.body;

  let query_sto = await dbConfig('close_wo_table')
    .select('sto_table.sto_name as sto', dbConfig.raw('Count(sto_table.sto_name) as hasil'))
    .join('sto_table', 'sto_table.id', '=', 'close_wo_table.id_sto')
    .where('close_wo_table.source', `${data.source}`)
    .whereBetween('close_wo_table.tanggal', [`${data.start_date}`, `${data.end_date}`])
    .groupBy('sto_table.sto_name');

  const count_agent = await dbConfig('close_wo_table')
    .where('close_wo_table.source', `${data.source}`)
    .whereBetween('close_wo_table.tanggal', [`${data.start_date}`, `${data.end_date}`])
    .count('id_sto', { as: 'total_sto' });

  const count_jgangguan = await dbConfig('close_wo_table')
    .where('close_wo_table.source', `${data.source}`)
    .whereBetween('close_wo_table.tanggal', [`${data.start_date}`, `${data.end_date}`])
    .count('id_sto', { as: 'total_sto' });

  let query_agent = await dbConfig('close_wo_table')
    .select('agent_table.name_agent as name_agent', dbConfig.raw('Count(agent_table.name_agent) as hasil'))
    .join('agent_table', 'agent_table.id', '=', 'close_wo_table.id_agent')
    .join('jenis_gangguan_table', 'jenis_gangguan_table.id', '=', 'close_wo_table.id_gangguan')
    .where('close_wo_table.source', `${data.source}`)
    .whereBetween('close_wo_table.tanggal', [`${data.start_date}`, `${data.end_date}`])
    .groupBy('agent_table.name_agent');

  query_agent.forEach(element => {
    element['hasil'] = element['hasil'] / count_agent[0]['total_sto'];
    console.log(element);
  });

  let query_gangguan = await dbConfig('close_wo_table')
    .select(
      'jenis_gangguan_table.jenis_gangguan as jenis_gangguan',
      dbConfig.raw('Count(jenis_gangguan_table.jenis_gangguan) as hasil'),
    )
    .join('jenis_gangguan_table', 'jenis_gangguan_table.id', '=', 'close_wo_table.id_gangguan')
    .where('close_wo_table.source', `${data.source}`)
    .whereBetween('close_wo_table.tanggal', [`${data.start_date}`, `${data.end_date}`])
    .groupBy('jenis_gangguan_table.jenis_gangguan');

  query_gangguan.forEach(element => {
    element['hasil'] = element['hasil'] / count_jgangguan[0]['total_sto'];
  });

  return res.status(200).json({
    status: 200,
    data: {
      sto: query_sto,
      agent: query_agent,
      jenis_gangguan: query_gangguan,
    },
  });
}
