import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const SettingChangePassword = dynamic(() => import('modules/setting/change-password'));
const SettingChangePasswordPage: NextPage = () => <SettingChangePassword />;

export default withAuth(SettingChangePasswordPage);
