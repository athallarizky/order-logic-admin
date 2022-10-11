import * as React from 'react';
import axios from '@/configs/axiosConfig';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const CloseWoCreate = dynamic(() => import('modules/closeWo/create'));

// export async function getServerSideProps(ctx) {
//   const formWoListReq = await axios.get('http://localhost:3030/api/close-wo-api');
//   const formWoList = await formWoListReq;

//   console.log('ADSDSADASAS');

//   return {
//     props: {
//       posts: {
//         data: 'hahahah',
//       },
//     },
//   };
// }

const CloseWoCreatePage: NextPage = () => <CloseWoCreate />;

export default CloseWoCreatePage;
