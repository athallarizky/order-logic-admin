/* eslint-disable max-len */
import * as React from 'react';

// Hooks, Helper, Interface, etc.
import { NextAppProps } from '@/interfaces/next';

// Components & Style
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/configs/themeConfig';
import Fonts from '@/components/layout/Fonts';
import AppLayout from '@/components/layout/AppLayout';
import Meta from '@/components/common/Meta';
import HydrationWrapper from '@/components/common/HydrationWrapper';

const App = (nextApp: NextAppProps): JSX.Element => {
  return (
    <HydrationWrapper>
      <Meta />
      <ChakraProvider theme={theme}>
        <Fonts />
        <AppLayout {...nextApp} />
      </ChakraProvider>
    </HydrationWrapper>
  );
};

export default App;
