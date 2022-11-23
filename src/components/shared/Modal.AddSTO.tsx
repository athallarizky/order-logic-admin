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
  Box,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

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
  const [onEdit, setOnEdit] = useState<boolean>(false);

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

  const deleteHandler = async id_sto => {
    await sender('/api/v1/sto/delete', { data: { id_sto } }, 'DELETE');
    mutate(`/api/v1/sto/`);
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
                <Tag margin="5px" size="sm" padding="5px" variant="solid" colorScheme="red" position="relative">
                  {onEdit && (
                    <Flex
                      justify="center"
                      align="center"
                      borderRadius="20px"
                      position="absolute"
                      background="white"
                      width="20px"
                      height="20px"
                      right="-8px"
                      cursor="pointer"
                      top="-8px"
                      zIndex="2"
                      color="primary"
                      border="2px solid"
                      borderColor="primary"
                      onClick={() => deleteHandler(code.id)}
                    >
                      <CloseIcon w={2} h={2} />
                    </Flex>
                  )}
                  {code.sto_name}
                </Tag>
              ))}
            </Flex>
            <Flex mt="12px" justify="center">
              <Text variant="textLink" fontSize="18px" cursor="pointer" onClick={() => setOnEdit(!onEdit)}>
                {onEdit ? 'Simpan' : 'Hapus STO'}
              </Text>
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
