import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetch from 'helper/fetcher';
import { FormWoDataListResponse } from 'interfaces/response';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
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
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  useSWR(!troubleData || shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}/api/close-wo-api/` : null, async () => {
    const response = await fetch<TroubleResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/close-wo-api/`);
    setTroubleData(response.data);
    setShouldFetch(false);
  });

  const columns = [
    {
      name: 'No Tiket',
      selector: row => row.no_tiket,
      sortable: true,
    },
    {
      name: 'No Internet',
      selector: row => row.no_internet,
      sortable: true,
    },
    {
      name: 'Tanggal',
      selector: row => format(new Date(row.tanggal), 'yyyy-MM-dd'),
      sortable: true,
    },
    {
      name: 'Kode STO',
      selector: row => row.code_sto,
    },
    {
      name: 'Loker',
      selector: row => row.loker,
    },
    {
      name: 'Perbaikan',
      selector: row => row.perbaikan,
    },
    {
      name: 'Agen HI',
      selector: row => row.agen_hi,
    },
    {
      name: 'keterangan',
      selector: row => row.keterangan,
    },
  ];

  const handleResetFilter = async () => {
    setShouldFetch(true);
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
            <Button onClick={() => handleResetFilter()} height="30px" background="primary">
              <RiAddFill className="icon" color="white" style={{ marginRight: '5px' }} />
              <Text fontSize="15px" color="white" onClick={() => router.push('/trouble-report/create')}>
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
