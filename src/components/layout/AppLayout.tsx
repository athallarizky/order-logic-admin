import * as React from 'react';
import { NextAppProps } from '@/interfaces/next';

const AppLayout = ({ Component, pageProps }: NextAppProps) => {
  const getLayout = Component?.layout ?? ((children: JSX.Element) => children);
  const page = getLayout(<Component {...pageProps} />);
  return page;
};

export default AppLayout;
