// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';
import bcrypt from 'bcrypt';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id, old_password, new_password } = req.body.data;

  const check = await dbConfig('users_table').where({ id });

  if (!check[0]) {
    return res.status(401).json({
      status: 401,
      message: 'user not found.',
    });
  }

  if (id && new_password && old_password) {
    const validPassword = await bcrypt.compare(old_password, check[0].password);
    if (validPassword) {
      await dbConfig('users_table')
        .where({ id })
        .update({
          password: bcrypt.hashSync(new_password, bcrypt.genSaltSync(10)),
        });
      return res.status(200).json({
        message: 'Update Success.',
      });
    }
    return res.status(400).json({
      message: 'Old password wrong.',
    });
  }
  return res.status(400).json({
    message: 'Password empty.',
  });
}

export default apiHandler(handler);
