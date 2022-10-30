import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const Performansi = dynamic(() => import('modules/performansi'), {
  ssr: false,
});
const PerformansiPage: NextPage = () => <Performansi />;

export default PerformansiPage;
