import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';
import { useRouter } from 'next/router';

// const router = useRouter();
// console.log('router', router);
// const routerParam = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   console.log('id', id);
// };

// routerParam();

const TroubleReportEdit = dynamic(() => import('modules/troubleReport/edit'));
const TroubleReportEditPage: NextPage = () => {
  // const router = useRouter();
  // console.log('router.query', router.query);
  return <TroubleReportEdit />;
};

export default withAuth(TroubleReportEditPage, `/trouble-report/edit`);
