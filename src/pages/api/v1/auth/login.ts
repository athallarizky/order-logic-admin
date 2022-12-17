/* eslint-disable @typescript-eslint/no-var-requires */
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import bcrypt from 'bcrypt';
// import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const jwt = require('jsonwebtoken');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { data } = JSON.parse(req.body);
  console.log('parsedData', data.nik);
  if (data.nik && data.password) {
    const user = await dbConfig('users_table').where('national_identity_number', `${data.nik}`);
    if (user[0]) {
      const validPassword = await bcrypt.compare(data.password, user[0].password);
      if (validPassword) {
        const userToken = user[0];
        const accessToken = jwt.sign({ userToken }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '7d',
        });
        res.setHeader('x-access-token', accessToken);
        res.status(200).json({
          status: 200,
          message: 'Valid password',
          token: accessToken,
        });
      } else {
        res.status(400).json({
          status: 200,
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
