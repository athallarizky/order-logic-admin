import React from 'react';
import { useRouter } from 'next/router';
// Components
import { Box, Flex, Text } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
// Interfaces
import { FormWoDataListResponse } from '@/interfaces/response';
// Libraries & Helper
import { IoMdArrowRoundForward } from 'react-icons/io';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';

interface CloseWoProps {
  formDataList?: {
    data?: FormWoDataListResponse[];
  };
}

const CloseWo: React.FC<CloseWoProps> = props => {
  const router = useRouter();

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
  return (
    <PageContainer>
      <Flex flexDirection="column">
        <Box>
          <Box
            display="inline-flex"
            alignItems="center"
            color="blue"
            cursor="pointer"
            onClick={() =>
              router.push({
                pathname: '/close-wo/create',
              })
            }
          >
            <Text mx="1vh">Create Form</Text>
            <IoMdArrowRoundForward />
          </Box>
        </Box>
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Form Close WO Logic
        </Text>
        <DataTable columns={columns} data={props?.formDataList?.data} striped selectableRows={false} />
      </Flex>
    </PageContainer>
  );
};

export default CloseWo;
