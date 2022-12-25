import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';
import withAuth from 'hooks/withAuth';

const Home = dynamic(() => import('modules/home'));

const HomePage: NextPage = () => <Home />;

export default withAuth(HomePage);
