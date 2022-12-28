import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const TroubleReportEdit = dynamic(() => import('modules/troubleReport/edit'));
const TroubleReportEditPage: NextPage = () => <TroubleReportEdit />;

export default withAuth(TroubleReportEditPage, `/trouble-report/edit`);
