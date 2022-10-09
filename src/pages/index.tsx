import * as React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

const Home = dynamic(() => import('modules/home'));

const HomePage: NextPage = () => <Home />;

export default HomePage;
