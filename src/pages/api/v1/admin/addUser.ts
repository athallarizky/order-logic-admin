import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler, { ExtractJWT } from '@/helper/api/api';
import bcrypt from 'bcrypt';

export default apiHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = ExtractJWT(req);
  if (admin['level'] !== 'Admin') return res.status(405).json({ message: 'You are not an admin.' });
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });

  const parsedData = JSON.parse(req.body);

  const { full_name, national_identity_number, password, level, status } = parsedData.data;
  if (!full_name || !national_identity_number || !password || !level || !status) {
    return res
      .status(400)
      .json({ status: 400, message: 'full_name, national_identity_number, password, level, status, required' });
  }
  await dbConfig('users_table').insert({
    full_name: full_name,
    national_identity_number: national_identity_number,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    level: level,
    status: 'Aktif',
  });

  return res.status(200).json({
    status: 200,
    message: 'created successfully',
  });
}
