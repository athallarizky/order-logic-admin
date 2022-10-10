import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const CloseWoCreate = dynamic(() => import('modules/closeWo/create'));

const CloseWoCreatePage: NextPage = () => <CloseWoCreate />;

export default CloseWoCreatePage;
