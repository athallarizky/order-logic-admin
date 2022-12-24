import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const Performansi = dynamic(() => import('modules/performansi'));
const PerformansiPage: NextPage = () => <Performansi />;

export default withAuth(PerformansiPage, 'performansi');
