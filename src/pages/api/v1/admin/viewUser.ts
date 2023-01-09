import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler, { ExtractJWT } from '@/helper/api/api';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = ExtractJWT(req);
  if (admin['level'] !== 'Admin') return res.status(405).json({ message: 'You are not an admin.' });
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed.' });

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ status: 400, message: 'id required' });
  }

  const users = await dbConfig('users_table')
    .where({ id })
    .select('id', 'full_name', 'national_identity_number', 'level', 'password', 'status', 'created_at');

  return res.status(200).json({
    status: 200,
    data: users[0],
  });
}

export default apiHandler(handler);
