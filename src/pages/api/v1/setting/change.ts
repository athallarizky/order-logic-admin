// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler, { ExtractJWT } from '@/helper/api/api';
import bcrypt from 'bcrypt';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();

  const userId = await ExtractJWT(req);
  const { old_password, new_password } = req.body.data;

  // console.log('userId', userId);

  const check = await dbConfig('users_table').where({ id: userId.id });

  if (!check[0]) {
    return res.status(401).json({
      status: 401,
      message: 'user not found.',
    });
  }

  // if (check[0].id !== userId['id']) {
  //   return res.status(401).json({
  //     status: 401,
  //     message: 'Unauthorized.',
  //   });
  // }

  if (userId.id && new_password && old_password) {
    const validPassword = await bcrypt.compare(old_password, check[0].password);
    if (validPassword) {
      await dbConfig('users_table')
        .where({ id: userId.id })
        .update({
          password: bcrypt.hashSync(new_password, bcrypt.genSaltSync(10)),
        });
      return res.status(200).json({
        status: 200,
        message: 'Update Success.',
      });
    }
    return res.status(401).json({
      status: 401,
      message: 'Old password wrong.',
    });
  }
  return res.status(400).json({
    status: 400,
    message: 'Password empty.',
  });
}

export default apiHandler(handler);
