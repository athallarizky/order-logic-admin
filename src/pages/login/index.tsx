import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const Login = dynamic(() => import('modules/login'));
const LoginPage: NextPage = () => <Login />;

export default withAuth(LoginPage);
