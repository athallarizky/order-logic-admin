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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import type { AgentListResponse } from '@/interfaces/response';

// Integrate API
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';
import useSWR, { mutate } from 'swr';
import { capitalizeWords } from '@/helper/utils';

type ModalAddAgentProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalAddAgent: React.FC<ModalAddAgentProps> = ({ isOpen, onClose }) => {
  const [agentName, setAgentName] = useState<string>('');

  const { data: agent_data } = useSWR(
    `/api/v1/agent/`,
    async () => {
      const response = await fetcher<AgentListResponse>(`/api/v1/agent/`);
      return response;
    },
    {
      revalidateOnFocus: false,
    },
  );

  const submitHandler = async () => {
    await sender('/api/v1/agent/create', { data: { name_agent: capitalizeWords(agentName) } });
    mutate(`/api/v1/agent/`);
    setAgentName('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="200px">
        <ModalHeader>Tambah Data Agent</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black" padding="5% 10%">
          <Flex flexDirection="column" mb="2vh">
            <Text mb="2vh">Available Agent List:</Text>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Nama Agent</Th>
                    <Th textAlign="center">Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {agent_data?.data?.map(gangguan => (
                    <Tr>
                      <Td>{gangguan.name_agent}</Td>
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
            <FormLabel>Nama Agent</FormLabel>
            <Input type="text" onChange={e => setAgentName(e.target.value)} value={agentName} />
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

export default ModalAddAgent;
