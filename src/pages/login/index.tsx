import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const Login = dynamic(() => import('modules/login'));
const LoginPage: NextPage = () => <Login />;

export default LoginPage;
