import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const TroubleReport = dynamic(() => import('modules/troubleReport'), {
  ssr: false,
});
const TroubleReportPage: NextPage = () => <TroubleReport />;

export default TroubleReportPage;
