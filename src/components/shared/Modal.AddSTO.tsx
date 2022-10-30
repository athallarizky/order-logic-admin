import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Text,
  Tag,
} from '@chakra-ui/react';
import type { STOList } from '@/interfaces/response';

// Integrate API
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';
import useSWR, { mutate } from 'swr';

type ModalAddStoProps = {
  isOpen: boolean;
  onClose: () => void;
};

export interface STOListResponse {
  data: STOList[];
}

const ModalAddSto: React.FC<ModalAddStoProps> = ({ isOpen, onClose }) => {
  const [STOCode, setSTOCode] = useState<string>('');
  // const { mutate } = useSWR();

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

  const submitHandler = async () => {
    await sender('/api/v1/sto/create', { data: { sto_name: STOCode.toUpperCase() } });
    mutate(`/api/v1/sto/`);
    setSTOCode('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="200px">
        <ModalHeader>Tambah Kode STO</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black" padding="5% 10%">
          <Flex flexDirection="column" mb="2vh">
            <Text mb="2vh">Available STO Code:</Text>
            <Flex flexWrap="wrap">
              {sto_data?.data?.map(code => (
                <Tag margin="2px" size="sm" padding="5px" variant="solid" colorScheme="red">
                  {code.sto_name}
                </Tag>
              ))}
            </Flex>
          </Flex>
          <FormControl mb="3vh">
            <FormLabel>Kode</FormLabel>
            <Input type="text" onChange={e => setSTOCode(e.target.value)} value={STOCode} maxLength={3} />
          </FormControl>
          <Flex justify="center">
            <Button background="primary" color="white" onClick={() => submitHandler()} marginX="10px" height="40px">
              <Text fontSize="20px">Simpan</Text>
            </Button>
            <Button background="white" color="primary" mr={3} onClick={onClose} marginX="10px">
              <Text fontSize="20px">Batalkan</Text>
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddSto;
