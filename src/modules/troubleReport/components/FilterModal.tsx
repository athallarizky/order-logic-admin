/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Textarea,
  Text,
} from '@chakra-ui/react';
import sender from 'helper/sender';
import { useSWRConfig } from 'swr';

type FilterModalProps = {
  setTroubleData?: (result: any) => void;
  isOpen: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, setTroubleData }) => {
  const [tanggal, setTanggal] = useState('');
  const { mutate } = useSWRConfig();

  const [fields, setFields] = useState({
    no_tiket: '',
    no_internet: '',
    code_sto: '',
    perbaikan: '',
    loker: '',
    agen_hi: '',
    keterangan: '',
    tanggal: '',
  });

  const fieldHandler = e => {
    const name = e.target.getAttribute('name');
    console.log(name);

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    let data = fields;
    if (tanggal !== undefined && tanggal !== '' && tanggal !== null) {
      console.log('MASUUUKK');
      data = Object.assign(fields, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    }

    const responseData = await mutate('/api/v1/filter', sender('/api/v1/filter', { data }));

    // const result = await axios.post('/close-wo-api/filter', {
    //   data: JSON.stringify(updatedField),
    // });
    // console.log(responseData);
    setTroubleData(responseData);
    setFields({
      no_tiket: '',
      no_internet: '',
      code_sto: '',
      perbaikan: '',
      loker: '',
      agen_hi: '',
      keterangan: '',
      tanggal: '',
    });
    setTanggal('');
    onClose();
  };

  const InputGroupStyle = styled.div`
    input {
      border-color: black;
    }
  `;

  const DatePickerStyle = styled.div`
    .datePicker input {
      background: #33333320;
      cursor: pointer;
    }

    .datepicker-input {
      padding: 2px;
      text-align: center !important;
      border: 1px solid;
    }
  `;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="800px">
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black">
          <Flex className="form-group" flexDirection="column" width="100%">
            <Flex justify="space-between" mb="2vh">
              <FormControl width="48%">
                <FormLabel>No Tiket</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="no_tiket" />
              </FormControl>

              <FormControl width="48%">
                <FormLabel>No Internet</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="no_internet" />
              </FormControl>
            </Flex>

            <Flex justify="space-between" mb="2vh">
              <FormControl width="48%">
                <FormLabel>Kode STO</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="code_sto" />
              </FormControl>

              <FormControl width="48%">
                <FormLabel>Perbaikan</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="perbaikan" />
              </FormControl>
            </Flex>

            <Flex justify="space-between" mb="2vh">
              <FormControl width="48%">
                <FormLabel>Loker</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="loker" />
              </FormControl>

              <FormControl width="48%">
                <FormLabel>Agen HI</FormLabel>
                <Input type="text" onChange={e => fieldHandler(e)} name="agen_hi" />
              </FormControl>
            </Flex>

            <FormControl mb="2vh">
              <FormLabel>Keterangan</FormLabel>
              <Textarea onChange={e => fieldHandler(e)} name="keterangan" />
            </FormControl>
            {/* </InputGroupStyle> */}
            <DatePickerStyle>
              <FormControl>
                <FormLabel>Tanggal</FormLabel>
                <DatePicker
                  className="datepicker-input"
                  selected={tanggal}
                  onChange={date => setTanggal(date)}
                  dateFormat="dd-MM-yyyy"
                  value={tanggal || 'pilih tanggal'}
                />
              </FormControl>
            </DatePickerStyle>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex justifyContent="center" alignItems="center" width="100%">
            <Button background="primary" color="white" onClick={() => submitHandler()} marginX="10px" height="40px">
              <Text fontSize="20px">Terapkan</Text>
            </Button>
            <Button background="white" color="primary" mr={3} onClick={onClose} marginX="10px">
              <Text fontSize="20px">Batalkan</Text>
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

FilterModal.defaultProps = {
  setTroubleData: undefined,
};

export default FilterModal;
