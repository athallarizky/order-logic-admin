import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuthAdmin from 'hooks/withAuthAdmin';

const CreateUser = dynamic(() => import('modules/admin/user-management/create'));
const CreateUserPage: NextPage = () => <CreateUser />;

export default withAuthAdmin(CreateUserPage, 'admin/user-management/create');
