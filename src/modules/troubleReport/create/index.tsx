import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';

const TroubleReport = () => {
  return (
    <PageContainer>
      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Input Gangguan Logic
        </Text>
        <Flex>
          tanggal - no. tiket - source - kode sto - no. internet - no. telepon - jenis gangguan - detail gangguan -
          perbaikan
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default TroubleReport;
