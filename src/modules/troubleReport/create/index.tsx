import React, { useState } from 'react';
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

// Components
import PageContainer from '@/components/layout/PageContainer';
import ModalAddSTO from '@/components/shared/Modal.AddSTO';
import ModalAddJenisGangguan from '@/components/shared/Modal.AddJenisGangguan';
import ModalAddAgent from '@/components/shared/Modal.AddAgent';

// Date Helper
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { isEmptyString } from '@/helper/utils';

// Integrate API
import useSWR, { mutate } from 'swr';
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';
import type { AgentListResponse, STOListResponse, JenisGangguanListResponse } from '@/interfaces/response';

const TroubleReport = () => {
  const [activePopup, setActivePopup] = useState<string>();

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

  const [tanggal, setTanggal] = useState(new Date());
  const [fields, setFields] = useState({
    no_tiket: '',
    no_internet: '',
    no_telp: '',
    id_sto: null,
    source: '',
    id_agent: null,
    id_gangguan: null,
    detail_gangguan: '',
    perbaikan: '',
  });

  const handlePopupOnClose = () => {
    setActivePopup('');
  };

  const [isFailed, setIsFailed] = useState<boolean>(false);

  const fieldHandler = e => {
    const name = e.target.getAttribute('name');
    setIsFailed(false);
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    setIsFailed(false);
    const { no_tiket, no_internet, no_telp, id_sto, source, id_agent, id_gangguan, perbaikan } = fields;

    const stillEmpty =
      isEmptyString(no_tiket) ||
      isEmptyString(no_internet) ||
      isEmptyString(no_telp) ||
      isEmptyString(source) ||
      isEmptyString(perbaikan);

    const stillNull = id_sto === null || id_agent === null || id_gangguan === null;

    if (stillEmpty || stillNull) {
      setIsFailed(true);
      return 'Failed';
    }

    let updatedField = fields;
    if (tanggal && tanggal !== null) {
      updatedField = Object.assign(fields, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    }

    await sender('/api/v1/create', { data: updatedField });

    setFields({
      no_tiket: '',
      no_internet: '',
      no_telp: '',
      id_sto: null,
      source: '',
      id_agent: null,
      id_gangguan: null,
      detail_gangguan: '',
      perbaikan: '',
    });

    return 'Success';
  };

  return (
    <PageContainer>
      <ModalAddSTO isOpen={activePopup === 'add-sto'} onClose={handlePopupOnClose} />
      <ModalAddJenisGangguan isOpen={activePopup === 'add-gangguan'} onClose={handlePopupOnClose} />
      <ModalAddAgent isOpen={activePopup === 'add-agent'} onClose={handlePopupOnClose} />
      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Input Gangguan Logic
        </Text>
        <Flex>
          <Flex className="form-group" flexDirection="column" width="100%">
            {/* Date and Source */}

            <FormControl mb="2vh" width="48%">
              <FormLabel>
                <Text>
                  Tanggal <span style={{ color: 'red' }}>*</span>
                </Text>
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
                  <Text>
                    No Tiket <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="no_tiket"
                  isRequired
                  isInvalid={isEmptyString(fields.no_tiket)}
                  value={fields.no_tiket}
                />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>
                  <Text>
                    Source <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Select
                  name="source"
                  placeholder="Select option"
                  onChange={e => fieldHandler(e)}
                  isRequired
                  isInvalid={fields.source === ''}
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
                  <Text>
                    No Internet <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="no_internet"
                  isRequired
                  isInvalid={isEmptyString(fields.no_internet)}
                  value={fields.no_internet}
                />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>
                  <Text>
                    No Telepon <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="no_telp"
                  isRequired
                  isInvalid={isEmptyString(fields.no_telp)}
                  value={fields.no_telp}
                />
              </FormControl>
            </Flex>

            <Flex align="center" mb="2vh">
              <FormControl width="100%">
                <FormLabel>
                  <Text>
                    Kode STO <span style={{ color: 'red' }}>*</span>
                  </Text>
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
                  <Button onClick={() => setActivePopup('add-sto')} background="white" color="primary" mr={3}>
                    <Text fontSize="20px">+ Tambah Kode STO</Text>
                  </Button>
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
                  <Button onClick={() => setActivePopup('add-gangguan')} background="white" color="primary" mr={3}>
                    <Text fontSize="20px">+ Tambah Jenis Gangguan</Text>
                  </Button>
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
                  <Button onClick={() => setActivePopup('add-agent')} background="white" color="primary" mr={3}>
                    <Text fontSize="20px">+ Tambah Agen Baru</Text>
                  </Button>
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
                isInvalid={isEmptyString(fields.perbaikan)}
                value={fields.perbaikan}
              />
            </FormControl>

            <FormControl mb="2vh">
              <FormLabel>Detail Gangguan</FormLabel>
              <Textarea onChange={e => fieldHandler(e)} name="detail_gangguan" value={fields.detail_gangguan} />
            </FormControl>

            <Text>
              <span style={{ color: 'red' }}>*</span>wajib diisi
            </Text>

            <Flex align="center" direction="column" mt="5vh">
              <Stack spacing={3} mb="3vh">
                {isFailed && (
                  <Alert status="error">
                    <AlertIcon />
                    Masih Ada Data yang Kosong!
                  </Alert>
                )}
              </Stack>
              <Button width="20%" background="primary" color="white" onClick={() => submitHandler()} height="50px">
                <Text fontSize="20px">Simpan</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default TroubleReport;
