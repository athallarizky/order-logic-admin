import React, { useState } from 'react';
// Date Helper
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// Hooks, Helper
import { useRouter } from 'next/router';
import axios from '@/configs/axiosConfig';
// Components & Icons
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Box, Flex, Text, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';

const CloseWo: React.FC = () => {
  const router = useRouter();
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

  const submitHandler = () => {
    const updatedField = Object.assign(fields, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    axios.post('/close-wo-api/create', {
      data: JSON.stringify(updatedField),
    });
  };

  return (
    <PageContainer>
      <Flex flexDirection="column">
        <Box>
          <Box display="inline-flex" alignItems="center" color="blue" cursor="pointer" onClick={() => router.back()}>
            <IoMdArrowRoundBack />
            <Text mx="1vh">Back</Text>
          </Box>
        </Box>
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Form Close WO Logic
        </Text>
        <Flex className="form-group" flexDirection="column" width="55%">
          <FormControl>
            <FormLabel>No Tiket</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="no_tiket" />
          </FormControl>

          <FormControl>
            <FormLabel>No Internet</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="no_internet" />
          </FormControl>

          <FormControl>
            <FormLabel>Kode STO</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="code_sto" />
          </FormControl>

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
          <FormControl>
            <FormLabel>Tanggal</FormLabel>
            <DatePicker selected={tanggal} onChange={(date: Date) => setTanggal(date)} dateFormat="dd-MM-yyyy" />
          </FormControl>
          <Button onClick={() => submitHandler()}>Submit</Button>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default CloseWo;
