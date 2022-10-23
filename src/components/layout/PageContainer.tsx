import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';

const PageContainer = ({ children }) => {
  return (
    <Container variant="pageContainer">
      <Sidebar />
      <Box ml={{ base: 0, md: 60 }} p="4" px="10" pb="30vh">
        {children}
      </Box>
    </Container>
  );
};

export default PageContainer;
