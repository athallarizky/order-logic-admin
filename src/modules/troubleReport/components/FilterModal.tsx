/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
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
  Select,
} from '@chakra-ui/react';

// Integrate API
import sender from 'helper/sender';
import type { AgentListResponse, STOListResponse, JenisGangguanListResponse } from '@/interfaces/response';
import fetcher from 'helper/fetcher';

type FilterModalProps = {
  setTroubleData?: (result: any) => void;
  isOpen: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, setTroubleData }) => {
  const [tanggal, setTanggal] = useState<any>();

  const [fields, setFields] = useState({
    no_tiket: '',
    no_internet: '',
    no_telp: '',
    id_sto: '',
    source: '',
    id_agent: '',
    id_gangguan: '',
    detail_gangguan: '',
    perbaikan: '',
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
    let data = fields;
    if (tanggal !== undefined && tanggal !== '' && tanggal !== null) {
      data = Object.assign(fields, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    }

    const responseData = await mutate('/api/v1/filter', sender('/api/v1/filter', { data }));

    setTroubleData(responseData);
    setFields({
      no_tiket: '',
      no_internet: '',
      no_telp: '',
      id_sto: '',
      source: '',
      id_agent: '',
      id_gangguan: '',
      detail_gangguan: '',
      perbaikan: '',
      tanggal: '',
    });
    setTanggal('');
    onClose();
  };

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

  // Fetch Agent
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="800px">
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black">
          <Flex>
            <Flex className="form-group" flexDirection="column" width="100%">
              {/* Date and Source */}

              <FormControl mb="2vh" width="48%">
                <FormLabel>
                  <Text>Tanggal</Text>
                </FormLabel>
                <DatePicker
                  selected={tanggal}
                  onChange={(date: Date) => setTanggal(date)}
                  dateFormat="dd-MM-yyyy"
                  className="datepicker-input"
                />
              </FormControl>

              {/* No Ticket and No Ticket*/}
              <Flex mb="2vh" justify="space-between">
                <FormControl width="48%">
                  <FormLabel>
                    <Text>No Tiket</Text>
                  </FormLabel>
                  <Input
                    type="text"
                    onChange={e => fieldHandler(e)}
                    name="no_tiket"
                    isRequired
                    value={fields.no_tiket}
                  />
                </FormControl>
                <FormControl width="48%">
                  <FormLabel>
                    <Text>Source</Text>
                  </FormLabel>
                  <Select
                    name="source"
                    placeholder="Select option"
                    onChange={e => fieldHandler(e)}
                    isRequired
                    value={fields.source}
                  >
                    <option value="draft">Draft</option>
                    <option value="group">Group</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex mb="2vh" justify="space-between">
                <FormControl width="48%">
                  <FormLabel>
                    <Text>No Internet</Text>
                  </FormLabel>
                  <Input
                    type="text"
                    onChange={e => fieldHandler(e)}
                    name="no_internet"
                    isRequired
                    value={fields.no_internet}
                  />
                </FormControl>
                <FormControl width="48%">
                  <FormLabel>
                    <Text>No Telepon</Text>
                  </FormLabel>
                  <Input type="text" onChange={e => fieldHandler(e)} name="no_telp" isRequired value={fields.no_telp} />
                </FormControl>
              </Flex>

              <Flex align="center" mb="2vh">
                <FormControl width="100%">
                  <FormLabel>
                    <Text>Kode STO</Text>
                  </FormLabel>
                  <Flex align="center">
                    <Select
                      name="id_sto"
                      placeholder="Select option"
                      width="48%"
                      mr="50px"
                      onClick={() => mutate(`/api/v1/sto/`)}
                      onChange={e => fieldHandler(e)}
                      isRequired
                      isInvalid={fields.id_sto === null}
                    >
                      {sto_data?.data?.map(sto => (
                        <option value={sto.id}>{sto.sto_name}</option>
                      ))}
                    </Select>
                  </Flex>
                </FormControl>
              </Flex>

              <Flex align="center" mb="2vh">
                <FormControl width="100%">
                  <FormLabel>
                    <Text>
                      Jenis Gangguan <span style={{ color: 'red' }}>*</span>
                    </Text>
                  </FormLabel>
                  <Flex align="center">
                    <Select
                      placeholder="Select option"
                      width="48%"
                      mr="50px"
                      name="id_gangguan"
                      onClick={() => mutate(`/api/v1/jenis_gangguan/`)}
                      onChange={e => fieldHandler(e)}
                      isRequired
                      isInvalid={fields.id_gangguan === null}
                    >
                      {jenis_gangguan?.data?.map(gangguan => (
                        <option value={gangguan.id}>{gangguan.jenis_gangguan}</option>
                      ))}
                    </Select>
                  </Flex>
                </FormControl>
              </Flex>

              <Flex align="center" mb="2vh">
                <FormControl width="100%">
                  <FormLabel>
                    <Text>
                      Nama Agent <span style={{ color: 'red' }}>*</span>
                    </Text>
                  </FormLabel>
                  <Flex align="center">
                    <Select
                      name="id_agent"
                      placeholder="Select option"
                      width="48%"
                      mr="50px"
                      onClick={() => mutate(`/api/v1/agent/`)}
                      onChange={e => fieldHandler(e)}
                      isRequired
                      isInvalid={fields.id_agent === null}
                    >
                      {agent_data?.data?.map(agent => (
                        <option value={agent.id}>{agent.name_agent}</option>
                      ))}
                    </Select>
                  </Flex>
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>
                  <Text>
                    Perbaikan <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="perbaikan"
                  isRequired
                  value={fields.perbaikan}
                />
              </FormControl>

              <FormControl mb="2vh">
                <FormLabel>Detail Gangguan</FormLabel>
                <Textarea onChange={e => fieldHandler(e)} name="detail_gangguan" value={fields.detail_gangguan} />
              </FormControl>
            </Flex>
          </Flex>
          {/* <Flex className="form-group" flexDirection="column" width="100%">
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
          </Flex> */}
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
