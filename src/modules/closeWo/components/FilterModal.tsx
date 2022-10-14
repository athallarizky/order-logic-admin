/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from '@/configs/axiosConfig';
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
} from '@chakra-ui/react';

type FilterModalProps = {
  updateFormCloseWOData?: (result: any) => void;
  isOpen: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, updateFormCloseWOData }) => {
  const [tanggal, setTanggal] = useState('');

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

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    console.log('fields11', fields);
    console.log('tanggal', typeof tanggal);
    // console.log('ISEMPTY', tanggal.isEmpty({}));
    let updatedField = fields;
    if (tanggal !== undefined && tanggal !== '' && tanggal !== null) {
      console.log('MASUUUKK');
      updatedField = Object.assign(fields, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    }

    console.log('fields11', updatedField);

    const result = await axios.post('/close-wo-api/filter', {
      data: JSON.stringify(updatedField),
    });

    updateFormCloseWOData(result?.data?.data);
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

  const DatePickerStyle = styled.div`
    .datePicker input {
      background: #33333320;
      cursor: pointer;
    }
  `;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex className="form-group" flexDirection="column" width="100%">
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
            <DatePickerStyle>
              <FormControl>
                <FormLabel>Tanggal</FormLabel>
                <DatePicker wrapperClassName="datePicker" onChange={date => setTanggal(date)} dateFormat="dd-MM-yyyy" />
              </FormControl>
            </DatePickerStyle>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex justifyContent="space-around" alignItems="center" width="100%">
            <Button colorScheme="blue" onClick={() => submitHandler()}>
              Filter Data
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Batalkan
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

FilterModal.defaultProps = {
  updateFormCloseWOData: undefined,
};

export default FilterModal;
