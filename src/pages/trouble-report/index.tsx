import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const TroubleReport = dynamic(() => import('modules/troubleReport'));
const TroubleReportPage: NextPage = () => <TroubleReport />;

export default withAuth(TroubleReportPage, '/trouble-report');
