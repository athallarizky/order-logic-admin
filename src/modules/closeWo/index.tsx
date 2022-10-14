/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
// Interfaces
import { FormWoDataListResponse } from '@/interfaces/response';
// Libraries & Helper
import { IoMdArrowRoundForward } from 'react-icons/io';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import axios from '@/configs/axiosConfig';

// Components
import { Box, Flex, Text, Button, useDisclosure } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import FilterModal from './components/FilterModal';

interface CloseWoProps {
  formDataList?: {
    data?: FormWoDataListResponse[];
  };
}

const CloseWo: React.FC<CloseWoProps> = props => {
  const [formCloseWOData, setFormCloseWOData] = useState(props?.formDataList?.data);

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    const { data } = await axios.get('/close-wo-api');
    console.log('data.data', data.data);
    setFormCloseWOData(data.data);
  };
  return (
    <PageContainer>
      <FilterModal isOpen={isOpen} onClose={onClose} updateFormCloseWOData={setFormCloseWOData} />
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
        <Box mb="4vh">
          <Button onClick={onOpen} colorScheme="blue">
            Filter
          </Button>
          <Button fontSize="18px" onClick={() => handleResetFilter()}>
            reset filter
          </Button>
        </Box>
        <DataTable columns={columns} data={formCloseWOData} striped selectableRows={false} />
      </Flex>
    </PageContainer>
  );
};

export default CloseWo;
