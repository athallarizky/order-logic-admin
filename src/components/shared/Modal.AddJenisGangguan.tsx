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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import type { JenisGangguanListResponse } from '@/interfaces/response';

// Integrate API
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';
import useSWR, { mutate } from 'swr';

type ModalAddJenisGangguanProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAddJenisGangguan: React.FC<ModalAddJenisGangguanProps> = ({ isOpen, onClose }) => {
  const [jenisGangguan, setJenisGangguan] = useState<string>('');

  const { data: jenis_gangguan_data } = useSWR(
    `/api/v1/jenis_gangguan/`,
    async () => {
      const response = await fetcher<JenisGangguanListResponse>(`/api/v1/jenis_gangguan/`);
      return response;
    },
    {
      revalidateOnFocus: false,
    },
  );

  const submitHandler = async () => {
    await sender('/api/v1/jenis_gangguan/create', { data: { jenis_gangguan: jenisGangguan.toUpperCase() } });
    mutate(`/api/v1/jenis_gangguan/`);
    setJenisGangguan('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="200px">
        <ModalHeader>Tambah Kode Jenis Gangguan</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black" padding="5% 10%">
          <Flex flexDirection="column" mb="2vh">
            <Text mb="2vh">Available Jenis Gangguan:</Text>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Jenis Gangguan</Th>
                    <Th textAlign="center">Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {jenis_gangguan_data?.data?.map(gangguan => (
                    <Tr>
                      <Td>{gangguan.jenis_gangguan}</Td>
                      <Td textAlign="center">
                        <Button background="primary" color="white" disabled marginX="10px" height="25px">
                          <Text fontSize="15px">Hapus</Text>
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <FormControl mb="3vh">
            <FormLabel>Jenis Gangguan</FormLabel>
            <Input type="text" onChange={e => setJenisGangguan(e.target.value)} value={jenisGangguan} />
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

export default ModalAddJenisGangguan;
