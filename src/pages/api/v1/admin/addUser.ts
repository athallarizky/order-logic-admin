import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export default apiHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    
}