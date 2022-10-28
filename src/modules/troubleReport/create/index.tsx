import React, { useState } from 'react';
import {
  useDisclosure,
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  Link,
} from '@chakra-ui/react';

// Components
import PageContainer from '@/components/layout/PageContainer';
import ModalAddSTO from '@/components/shared/Modal.AddSTO';

// Date Helper
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Fetcher
import useSWR, { mutate } from 'swr';
import fetcher from 'helper/fetcher';
import type { STOList, JenisGangguanList } from '@/interfaces/response';

// export interface STOList {
//   id: number;
//   sto_name: string;
//   created_at: string;
// }

export interface STOListResponse {
  data: STOList[];
}

export interface JenisGangguanListResponse {
  data: JenisGangguanList[];
}

const TroubleReport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Fetch STO
  const { data: sto_data } = useSWR(
    `/api/v1/sto/`,
    async () => {
      const response = await fetcher<STOListResponse>(`/api/v1/sto/`);
      return response;
    },
    {
      revalidateOnFocus: false,
    },
  );

  // Fetch Jenis Gangguan
  const { data: jenis_gangguan } = useSWR(
    `/api/v1/jenis_gangguan/`,
    async () => {
      const response = await fetcher<JenisGangguanListResponse>(`/api/v1/jenis_gangguan/`);
      return response;
    },
    {
      revalidateOnFocus: false,
    },
  );

  const [tanggal, setTanggal] = useState(new Date());

  const [fields, setFields] = useState({
    no_tiket: '',
    no_internet: '',
    code_sto: '',
    perbaikan: '',
    loker: '',
    agen_hi: '',
    keterangan: '',
  });

  const fieldHandler = e => {
    const name = e.target.getAttribute('name');

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const handlePopupOnClose = () => {
    onClose();
  };

  const submitHandler = () => {
    // const updatedField = Object.assign(fields, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    // axios.post('/close-wo-api/create', {
    //   data: JSON.stringify(updatedField),
    // });
  };

  // tanggal - no. tiket - source - kode sto - no. internet - no. telepon - jenis gangguan - detail gangguan -
  //         perbaikan
  return (
    <PageContainer>
      <ModalAddSTO isOpen={isOpen} onClose={handlePopupOnClose} />
      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Input Gangguan Logic
        </Text>
        <Flex>
          <Flex className="form-group" flexDirection="column" width="100%">
            {/* Date and Source */}

            <FormControl mb="2vh">
              <FormLabel>Tanggal</FormLabel>
              <DatePicker selected={tanggal} onChange={(date: Date) => setTanggal(date)} dateFormat="dd-MM-yyyy" />
            </FormControl>

            {/* No Ticket and No Ticket*/}
            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>No Tiket</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="no_tiket" />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>Source</FormLabel>
                <Select placeholder="Select option">
                  <option value="draft">Draft</option>
                  <option value="draft">Group</option>
                </Select>
              </FormControl>
            </Flex>

            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>No Internet</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="no_internet" />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>No Telepon</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="no_internet" />
              </FormControl>
            </Flex>

            <Flex align="center" mb="2vh">
              <FormControl width="100%">
                <FormLabel>Kode STO</FormLabel>
                <Flex align="center">
                  <Select placeholder="Select option" width="48%" mr="50px" onClick={() => mutate(`/api/v1/sto/`)}>
                    {sto_data?.data?.map(sto => (
                      <option value={sto.id}>{sto.sto_name}</option>
                    ))}
                  </Select>
                  <Button onClick={onOpen} background="white" color="primary" mr={3}>
                    <Text fontSize="20px">+ Tambah Kode STO</Text>
                  </Button>
                </Flex>
              </FormControl>
            </Flex>

            <Flex align="center" mb="2vh">
              <FormControl width="100%">
                <FormLabel>Jenis Gangguan</FormLabel>
                <Flex align="center">
                  <Select placeholder="Select option" width="48%" mr="50px" onClick={() => mutate(`/api/v1/sto/`)}>
                    {jenis_gangguan?.data?.map(gangguan => (
                      <option value={gangguan.id}>{gangguan.jenis_gangguan}</option>
                    ))}
                  </Select>
                  <Button onClick={onOpen} background="white" color="primary" mr={3}>
                    <Text fontSize="20px">+ Tambah Jenis Gangguan</Text>
                  </Button>
                </Flex>
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel>Perbaikan</FormLabel>
              <Input type="text" onChange={e => fieldHandler(e)} name="perbaikan" />
            </FormControl>

            <FormControl>
              <FormLabel>Loker</FormLabel>
              <Input type="text" onChange={e => fieldHandler(e)} name="loker" />
            </FormControl>

            <FormControl>
              <FormLabel>Agen HI</FormLabel>
              <Input type="text" onChange={e => fieldHandler(e)} name="agen_hi" />
            </FormControl>

            <FormControl>
              <FormLabel>Keterangan</FormLabel>
              <Textarea onChange={e => fieldHandler(e)} name="keterangan" />
            </FormControl>

            <Button onClick={() => submitHandler()}>Submit</Button>
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default TroubleReport;
