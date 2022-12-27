/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GangguanLogicList } from 'interfaces/response';
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
  Select,
} from '@chakra-ui/react';

type FilterModalProps = {
  troubleData: GangguanLogicList;
  isOpen: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, troubleData }) => {
  console.log('troubleData', troubleData);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="800px">
        <ModalHeader>Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black">
          <Flex>
            <Flex className="form-group" flexDirection="column" width="100%">
              {/* Date and Source */}
              <Flex mb="2vh" justify="space-between">
                <FormControl mb="2vh" width="48%">
                  <FormLabel>
                    <Text>Data ID</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.id} />
                </FormControl>
                <FormControl mb="2vh" width="48%">
                  <FormLabel>
                    <Text>Tanggal</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={format(new Date(troubleData?.tanggal), 'yyyy-MM-dd')} />
                </FormControl>
              </Flex>

              {/* No Ticket and No Ticket*/}
              <Flex mb="2vh" justify="space-between">
                <FormControl width="48%">
                  <FormLabel>
                    <Text>No Tiket</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.no_tiket} />
                </FormControl>
                <FormControl width="48%">
                  <FormLabel>
                    <Text>Source</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.source} />
                </FormControl>
              </Flex>

              <Flex mb="2vh" justify="space-between">
                <FormControl width="48%">
                  <FormLabel>
                    <Text>No Internet</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.no_internet} />
                </FormControl>
                <FormControl width="48%">
                  <FormLabel>
                    <Text>No Telepon</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.no_telp} />
                </FormControl>
              </Flex>

              <Flex align="center" mb="2vh">
                <FormControl width="100%">
                  <FormLabel>
                    <Text>Kode STO</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.sto} />
                </FormControl>
              </Flex>

              <Flex align="center" mb="2vh">
                <FormControl width="100%">
                  <FormLabel>
                    <Text>Jenis Gangguan</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.jenis_gangguan} />
                </FormControl>
              </Flex>

              <Flex align="center" mb="2vh">
                <FormControl width="100%">
                  <FormLabel>
                    <Text>Nama Agent</Text>
                  </FormLabel>
                  <Input type="text" readOnly value={troubleData?.agent} />
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>
                  <Text>Perbaikan</Text>
                </FormLabel>
                <Input type="text" readOnly value={troubleData?.perbaikan} />
              </FormControl>

              <FormControl mb="2vh">
                <FormLabel>Detail Gangguan</FormLabel>
                <Textarea readOnly name="detail_gangguan" value={troubleData?.detail_gangguan} />
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex justifyContent="center" alignItems="center" width="100%">
            <Button background="white" color="primary" mr={3} onClick={onClose} marginX="10px">
              <Text fontSize="20px">Tutup</Text>
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

FilterModal.defaultProps = {
  // setTroubleData: undefined,
};

export default FilterModal;
