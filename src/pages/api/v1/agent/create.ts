import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ status: 405, message: 'Method not allowed' });

  const parsedData = JSON.parse(req.body);
  const { name_agent } = parsedData.data;

  if (!name_agent) {
    return res.status(400).json({ status: 400, message: 'name required' });
  }

  await dbConfig('agent_table').insert({
    name_agent,
  });
  return res.status(200).json({
    status: 200,
    message: 'created successfully',
  });
}
