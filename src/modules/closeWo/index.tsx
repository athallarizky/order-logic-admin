import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
const CloseWo: React.FC = () => {
  return (
    <PageContainer>
      <Link href="/close-wo/create" textDecoration="underline">
        Go to create page
      </Link>
    </PageContainer>
  );
};

export default CloseWo;
