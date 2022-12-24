import React from 'react';
import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from 'helper/fetcher';
import { FormWoDataListResponse } from 'interfaces/response';
import { useRouter } from 'next/router';
import useIsMounted from 'hooks/useIsMounted';

import PageContainer from '@/components/layout/PageContainer';

import useUserStore from 'stores/useUserStore';

export type TroubleResponse = {
  data: FormWoDataListResponse[];
};

const Home: React.FC = () => {
  const { userData } = useUserStore(state => state);

  const isMounted = useIsMounted();

  const { data: report_data } = useSWR(isMounted ? `fetchTroubleData` : null, async () => {
    const response = await fetcher<TroubleResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  });

  const router = useRouter();

  return (
    <PageContainer>
      <Box className="greetings">
        <Text fontSize="25px">
          Welcome, {userData.name}!{' '}
          <Text as="span" color="#00000070">
            ({userData.national_identity_number})
          </Text>
        </Text>
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
              {report_data?.data.length}
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
