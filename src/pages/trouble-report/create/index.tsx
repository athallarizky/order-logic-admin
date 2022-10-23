import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const CreateTroubleReport = dynamic(() => import('modules/troubleReport/create'), {
  ssr: false,
});
const CreateTroubleReportPage: NextPage = () => <CreateTroubleReport />;

export default CreateTroubleReportPage;
