import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const UserEdit = dynamic(() => import('modules/admin/user-management/edit'));
const UserEditPage: NextPage = () => <UserEdit />;

export default withAuth(UserEditPage, `/user-management/edit`);
