/* eslint-disable @typescript-eslint/no-var-requires */
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import bcrypt from 'bcrypt';
// import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const parsedData = req.body;
  if (parsedData.nik && parsedData.password) {
    const user = await dbConfig('users_table').where('national_identity_number', `${parsedData.nik}`);
    if (user[0]) {
      if (user[0].status == "Tidak Aktif") {
        return res.status(400).json({
          status: 400,
          error: 'Status Inactive.',
        });
      }
      const validPassword = await bcrypt.compare(parsedData.password, user[0].password);
      if (validPassword) {
        const userToken = user[0];
        const accessToken = jwt.sign({ userToken }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1d',
        });
        res.setHeader('authorization', accessToken);
        return res.status(200).json({
          status: 200,
          message: 'Success login.',
          data: {
            user: {
              name: user[0].full_name,
              national_identity_number: user[0].national_identity_number,
              level: user[0].level,
              created_at: user[0].created_at,
            },
            token: accessToken,
          },
        });
      } else {
        return res.status(400).json({
          status: 400,
          error: 'Invalid Password',
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: 'User does not exist',
      });
    }
  }
  return res.status(400).json({
    status: 400,
    message: 'there is an empty field.',
  });
}
