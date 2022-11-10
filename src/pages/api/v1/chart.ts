import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import { sq } from 'date-fns/locale';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  //   const parsedData = JSON.parse(req.body);
  //   const { data } = parsedData.data;
  const { data } = req.body;

  const total_sto = await dbConfig('close_wo_table')
    .where('close_wo_table.source', `${data.source}`)
    .orWhere('close_wo_table.tanggal', `${data.tanggal}`)
    .count('id_sto', { as: 'total_sto' });

  let sql = await dbConfig('close_wo_table')
    .select(
      'sto_table.sto_name as sto',
      dbConfig.raw('Count(sto_table.sto_name) as hasil'),
    )
    .join('sto_table', 'sto_table.id', '=', 'close_wo_table.id_sto')
    .join('agent_table', 'agent_table.id', '=', 'close_wo_table.id_agent')
    .join('jenis_gangguan_table', 'jenis_gangguan_table.id', '=', 'close_wo_table.id_gangguan')
    .where('close_wo_table.source', `${data.source}`)
    .whereBetween('close_wo_table.tanggal', [`${data.start_date}`, `${data.end_date}`])
    .groupBy('sto_table.sto_name');

  sql.forEach(element => {
    element['hasil'] = (element['hasil'] / total_sto[0]['total_sto']) * 100
    console.log(element);
  });
  return res.status(200).json({
    status: 200,
    data: {
      sto: sql,
    },
  });
}
