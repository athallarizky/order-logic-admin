import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const CreateTroubleReport = dynamic(() => import('modules/troubleReport/create'));
const CreateTroubleReportPage: NextPage = () => <CreateTroubleReport />;

export default withAuth(CreateTroubleReportPage, 'trouble-report/create');
