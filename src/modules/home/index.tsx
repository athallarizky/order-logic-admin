import React from 'react';
import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import useSWR from 'swr';
import fetch from 'helper/fetcher';
import { FormWoDataListResponse } from 'interfaces/response';
import { useRouter } from 'next/router';

import PageContainer from '@/components/layout/PageContainer';

export type TroubleResponse = {
  data: FormWoDataListResponse[];
};

const Home: React.FC = () => {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`, async () => {
    const response = await fetch<TroubleResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`);
    return response;
  });
  const router = useRouter();
  return (
    <PageContainer>
      <Box className="greetings">
        <Text fontSize="25px">Selamat Datang, Admin!</Text>
      </Box>

      <Divider marginY="2vh" />

      <Flex flexDirection="column">
        <Text fontSize="20px" fontWeight="bold" mb="2vh">
          Statistik
        </Text>
        <Flex
          direction="column"
          width="300px"
          bg="#045174"
          color="#FFF"
          borderRadius="4px"
          align="center"
          justify="center"
          cursor="pointer"
          onClick={() => router.push('/trouble-report')}
        >
          <Box padding="5px 8px" textAlign="center">
            <Text fontSize="30px" fontWeight="bold">
              {data?.data.length}
            </Text>
            <Text>Lihat Semua Data Gangguan</Text>
          </Box>

          <Flex justify="center" bg="#001F3D" padding="2px" width="100%">
            Selengkapnya
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default Home;
