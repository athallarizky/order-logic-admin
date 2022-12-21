import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler, { ExtractJWT } from '@/helper/api/api';

export default apiHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = ExtractJWT(req);
  if (admin['level'] !== 'Admin') return res.status(405).json({ message: 'You are not an admin.' });
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed.' });

  const users = await dbConfig('users_table').select('id', 'full_name', 'national_identity_number', 'level', 'status', 'created_at');

  return res.status(200).json({
    status: 200,
    users: users,
  });
}
