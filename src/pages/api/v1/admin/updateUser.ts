import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler, { ExtractJWT } from '@/helper/api/api';
import bcrypt from 'bcrypt';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = ExtractJWT(req);
  if (admin['level'] !== 'Admin') return res.status(405).json({ message: 'You are not an admin.' });
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed.' });

  const { id, full_name, national_identity_number, password, level, status } = req.body.data;
  if (!id || !full_name || !national_identity_number || !level || !status) {
    return res
      .status(400)
      .json({ status: 400, message: 'id, full_name, national_identity_number, level, status, required' });
  }

  const check = await dbConfig('users_table').where({ id });

  if (!check[0]) {
    return res.status(401).json({
      status: 401,
      message: 'user not found.',
    });
  }

  if (password) {
    // const user = await dbConfig('users_table').where('national_identity_number', `${national_identity_number}`);
    // const validPassword = await bcrypt.compare(old_password, user[0].password);
    // if (validPassword) {
    await dbConfig('users_table')
      .where({ id })
      .update({
        full_name,
        national_identity_number,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        level,
        status,
      });
    // }
    // return res.status(401).json({
    //   status: 401,
    //   message: 'old password not match',
    // });
  }
  await dbConfig('users_table').where({ id }).update({
    full_name,
    national_identity_number,
    level,
    status,
  });

  return res.status(200).json({
    status: 200,
    message: 'Successfully Update User Data',
  });
}

export default apiHandler(handler);
