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
  const [date, setDate] = useState(new Date());

  console.log(typeof date);
  const [fields, setFields] = useState({
    no_ticket: '',
    no_internet: '',
    sto_code: '',
    repairment: '',
    loker: '',
    agent_hi: '',
    notes: '',
  });

  const fieldHandler = e => {
    const name = e.target.getAttribute('name');

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const submitHandler = () => {
    const updatedField = Object.assign(fields, { date: format(new Date(date), 'yyyy-MM-dd') });
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
            <Input type="text" onChange={e => fieldHandler(e)} name="no_ticket" />
          </FormControl>

          <FormControl>
            <FormLabel>No Internet</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="no_internet" />
          </FormControl>

          <FormControl>
            <FormLabel>Kode STO</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="sto_code" />
          </FormControl>

          <FormControl>
            <FormLabel>Perbaikan</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="repairment" />
          </FormControl>

          <FormControl>
            <FormLabel>Loker</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="loker" />
          </FormControl>

          <FormControl>
            <FormLabel>Agen HI</FormLabel>
            <Input type="text" onChange={e => fieldHandler(e)} name="agent_hi" />
          </FormControl>

          <FormControl>
            <FormLabel>Keterangan</FormLabel>
            <Textarea onChange={e => fieldHandler(e)} name="notes" />
          </FormControl>
          <FormControl>
            <FormLabel>Tanggal</FormLabel>
            <DatePicker selected={date} onChange={(dates: Date) => setDate(dates)} dateFormat="dd-MM-yyyy" />
          </FormControl>
          <Button onClick={() => submitHandler()}>Submit</Button>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default CloseWo;
