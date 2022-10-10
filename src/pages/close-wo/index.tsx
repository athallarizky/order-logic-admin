import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const CloseWo = dynamic(() => import('modules/closeWo'));

const CloseWoPage: NextPage = () => <CloseWo />;

export default CloseWoPage;
