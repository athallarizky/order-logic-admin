import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuthAdmin from 'hooks/withAuthAdmin';

const UserManagement = dynamic(() => import('modules/admin/user-management'));
const UserManagementPage: NextPage = () => <UserManagement />;

export default withAuthAdmin(UserManagementPage, 'admin/user-management');
