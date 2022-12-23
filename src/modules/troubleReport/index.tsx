import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import fetcher from 'helper/fetcher';
import { FormWoDataListResponse } from 'interfaces/response';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import useIsMounted from 'hooks/useIsMounted';
// Components
import { Box, Flex, Text, Button, useDisclosure } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import { RiAddFill } from 'react-icons/ri';

import FilterModal from './components/FilterModal';

export type TroubleResponse = {
  data: FormWoDataListResponse[];
};

const TroubleReport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [troubleData, setTroubleData] = useState(null);
  const router = useRouter();

  const isMounted = useIsMounted();

  useSWR(
    isMounted ? `fetchTroubleData` : null,
    async () => {
      const response = await fetcher<TroubleResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      setTroubleData(response.data);
    },
    {
      revalidateOnFocus: false,
    },
  );

  const columns = [
    {
      name: 'Tanggal',
      selector: row => format(new Date(row.tanggal), 'yyyy-MM-dd'),
      sortable: true,
    },
    {
      name: 'No. Tiket',
      selector: row => row.no_tiket,
      sortable: true,
    },
    {
      name: 'Source',
      selector: row => row.source,
      sortable: true,
    },
    {
      name: 'Kode STO',
      selector: row => row.sto,
    },
    {
      name: 'No. Internet',
      selector: row => row.no_internet,
    },
    {
      name: 'No. Telepon',
      selector: row => row.no_telp,
    },
    {
      name: 'Jenis Gangguan',
      selector: row => row.jenis_gangguan,
    },
    {
      name: 'Detail Gangguan',
      selector: row => row.detail_gangguan,
    },
    {
      name: 'Perbaikan',
      selector: row => row.perbaikan,
    },
    {
      name: 'Agen',
      selector: row => row.agent,
    },
  ];

  const handleResetFilter = () => {
    mutate('fetchTroubleData');
  };

  return (
    <PageContainer>
      <FilterModal isOpen={isOpen} onClose={onClose} setTroubleData={setTroubleData} />
      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Rekap Gangguan Logic
        </Text>
        <Flex mb="4vh" justify="space-between" align="center">
          <Box className="left-action">
            <Button onClick={onOpen} background="primary" height="30px">
              <Text color="#FFF" fontSize="15px">
                Filter
              </Text>
            </Button>
            <Button onClick={() => handleResetFilter()}>
              <Text color="black" fontSize="15px">
                Reset Filter
              </Text>
            </Button>
          </Box>
          <Box className="right-action">
            <Button onClick={() => router.push('/trouble-report/create')} height="30px" background="primary">
              <RiAddFill className="icon" color="white" style={{ marginRight: '5px' }} />
              <Text fontSize="15px" color="white">
                Tambah Data
              </Text>
            </Button>
          </Box>
        </Flex>
        <DataTable columns={columns} data={troubleData ?? []} striped selectableRows={false} />
      </Flex>
    </PageContainer>
  );
};

export default TroubleReport;
