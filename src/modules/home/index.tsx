import React from 'react';
import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from 'helper/fetcher';
import { FormWoDataListResponse } from 'interfaces/response';
import { useRouter } from 'next/router';

import PageContainer from '@/components/layout/PageContainer';

export type TroubleResponse = {
  data: FormWoDataListResponse[];
};

const Home: React.FC = () => {
  // const { data } = useSWR(`hitApi`, async () => {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`, localStorage.getItem('token'));
  //   return response;
  // }),{
  //   revalidateOnFocus: false,
  // };

  // console.log('dadsa', localStorage.getItem('token'));

  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`, localStorage.getItem('token')],
    fetcher,
  );
  console.log('data', error);
  const router = useRouter();

  // const { data: agent_data } = useSWR(
  //   `totalTrouble`,
  //   async () => {
  //     const response = await getData(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`, localStorage.getItem('token'));
  //     return response;
  //   },
  //   {
  //     revalidateOnFocus: false,
  //   },
  // );

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
              {/* {data?.data.length} */}
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
