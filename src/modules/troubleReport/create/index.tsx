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

// Date & Helper
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isEmptyString } from '@/helper/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR, { mutate } from 'swr';
// import { useRouter } from 'next/router';

// Integrate API
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';
import type { AgentListResponse, STOListResponse, JenisGangguanListResponse } from '@/interfaces/response';

const TroubleReport = () => {
  const [activePopup, setActivePopup] = useState<string>();
  // const router = useRouter();
  // Fetch STO
  const { data: sto_data } = useSWR(
    `fetchSTOData`,
    async () => {
      const response = await fetcher<STOListResponse>(`/api/v1/sto/`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      return response;
    },
    {
      revalidateOnFocus: false,
    },
  );

  // Fetch Jenis Gangguan
  const { data: jenis_gangguan } = useSWR(
    `fetchJenisGangguanData`,
    async () => {
      const response = await fetcher<JenisGangguanListResponse>(`/api/v1/jenis_gangguan/`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      return response;
    },
    {
      revalidateOnFocus: false,
    },
  );

  // Fetch Agent
  const { data: agent_data } = useSWR(
    `fetchAgentData`,
    async () => {
      const response = await fetcher<AgentListResponse>(`/api/v1/agent/`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
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

  const [responseMessage, setResponseMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<string | 'success' | 'error'>('');

  const fieldHandler = e => {
    const name = e.target.getAttribute('name');
    setResponseMessage('');
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    setResponseMessage('');
    setResponseStatus('');
    const { no_tiket, no_internet, no_telp, id_sto, source, id_agent, id_gangguan, perbaikan } = fields;

    const stillEmpty =
      isEmptyString(no_tiket) ||
      isEmptyString(no_internet) ||
      isEmptyString(no_telp) ||
      isEmptyString(source) ||
      isEmptyString(perbaikan);

    const stillNull = id_sto === null || id_agent === null || id_gangguan === null;

    if (stillEmpty || stillNull) {
      setResponseMessage('Masih Ada Data yang Kosong!');
      setResponseStatus('error');
    }

    let updatedField = fields;
    if (tanggal && tanggal !== null) {
      updatedField = Object.assign(fields, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    }

    const response = await sender('/api/v1/create', { data: updatedField }, localStorage.getItem('token'));

    if (response.status === 200) {
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light',
      });
    } else {
      toast.error(response.message, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light',
      });
      return;
    }

    setFields({
      no_tiket: '',
      no_internet: '',
      no_telp: '',
      source: '',
      id_sto: null,
      id_agent: null,
      id_gangguan: null,
      detail_gangguan: '',
      perbaikan: '',
    });
    setResponseStatus('success');
    setResponseMessage('Berhasil Tambah Data');
  };

  return (
    <PageContainer>
      <ToastContainer />
      <ModalAddSTO isOpen={activePopup === 'add-sto'} onClose={handlePopupOnClose} />
      <ModalAddJenisGangguan isOpen={activePopup === 'add-gangguan'} onClose={handlePopupOnClose} />
      <ModalAddAgent isOpen={activePopup === 'add-agent'} onClose={handlePopupOnClose} />
      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Input Gangguan Logic
        </Text>
        <Flex>
          <Flex className="form-group" flexDirection="column" width="100%">
            <FormControl mb="2vh" width="48%">
              <FormLabel>
                <Text variant="textInput">
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
                  <Text variant="textInput">
                    No Tiket <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="no_tiket"
                  isRequired
                  // isInvalid={isEmptyString(fields.no_tiket)}
                  value={fields.no_tiket}
                  variant="outline"
                  color="black"
                />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Source <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Select
                  name="source"
                  placeholder="Select option"
                  onChange={e => fieldHandler(e)}
                  isRequired
                  // isInvalid={fields.source === ''}
                  value={fields.source}
                  variant="outline"
                  color="black"
                >
                  <option value="draft">Draft</option>
                  <option value="group">Group</option>
                </Select>
              </FormControl>
            </Flex>

            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    No Internet <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="no_internet"
                  isRequired
                  value={fields.no_internet}
                  variant="outline"
                  color="black"
                />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    No Telepon <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="no_telp"
                  isRequired
                  value={fields.no_telp}
                  variant="outline"
                  color="black"
                />
              </FormControl>
            </Flex>

            <Flex align="center" mb="2vh">
              <FormControl width="100%">
                <FormLabel>
                  <Text variant="textInput">
                    Kode STO <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Flex align="center">
                  <Select
                    name="id_sto"
                    placeholder="Select option"
                    width="48%"
                    mr="50px"
                    onClick={() => mutate(`fetchSTOData`)}
                    onChange={e => fieldHandler(e)}
                    isRequired
                    variant="outline"
                    color="black"
                  >
                    {sto_data?.data?.map(sto => (
                      <option value={sto.id}>{sto.sto_name}</option>
                    ))}
                  </Select>
                  <Button onClick={() => setActivePopup('add-sto')} background="white" color="primary" mr={3}>
                    <Text fontSize="20px" variant="textLink">
                      + Tambah Kode STO
                    </Text>
                  </Button>
                </Flex>
              </FormControl>
            </Flex>

            <Flex align="center" mb="2vh">
              <FormControl width="100%">
                <FormLabel>
                  <Text variant="textInput">
                    Jenis Gangguan <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Flex align="center">
                  <Select
                    placeholder="Select option"
                    width="48%"
                    mr="50px"
                    name="id_gangguan"
                    onClick={() => mutate(`fetchJenisGangguanData`)}
                    onChange={e => fieldHandler(e)}
                    isRequired
                    variant="outline"
                    color="black"
                  >
                    {jenis_gangguan?.data?.map(gangguan => (
                      <option value={gangguan.id}>{gangguan.jenis_gangguan}</option>
                    ))}
                  </Select>
                  <Button onClick={() => setActivePopup('add-gangguan')} background="white" color="primary" mr={3}>
                    <Text fontSize="20px" variant="textLink">
                      + Tambah Jenis Gangguan
                    </Text>
                  </Button>
                </Flex>
              </FormControl>
            </Flex>

            <Flex align="center" mb="2vh">
              <FormControl width="100%">
                <FormLabel>
                  <Text variant="textInput">
                    Nama Agent <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Flex align="center">
                  <Select
                    name="id_agent"
                    placeholder="Select option"
                    width="48%"
                    mr="50px"
                    onClick={() => mutate(`fetchAgentData`)}
                    onChange={e => fieldHandler(e)}
                    isRequired
                    variant="outline"
                    color="black"
                  >
                    {agent_data?.data?.map(agent => (
                      <option value={agent.id}>{agent.name_agent}</option>
                    ))}
                  </Select>
                  <Button onClick={() => setActivePopup('add-agent')} background="white" color="primary" mr={3}>
                    <Text fontSize="20px" variant="textLink">
                      + Tambah Agen Baru
                    </Text>
                  </Button>
                </Flex>
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel>
                <Text variant="textInput">
                  Perbaikan <span style={{ color: 'red' }}>*</span>
                </Text>
              </FormLabel>
              <Input
                type="text"
                onChange={e => fieldHandler(e)}
                name="perbaikan"
                isRequired
                value={fields.perbaikan}
                variant="outline"
                color="black"
              />
            </FormControl>

            <FormControl mb="2vh">
              <FormLabel>Detail Gangguan</FormLabel>
              <Textarea
                onChange={e => fieldHandler(e)}
                name="detail_gangguan"
                value={fields.detail_gangguan}
                variant="textInput"
                color="black"
              />
            </FormControl>

            <Text variant="textInput">
              <span style={{ color: 'red' }}>*</span>wajib diisi
            </Text>

            <Flex align="center" direction="column" mt="5vh">
              <Stack spacing={3} mb="3vh">
                {responseMessage && (
                  <Alert status={responseStatus === 'success' ? 'success' : 'error'}>
                    <AlertIcon />
                    {responseMessage}
                  </Alert>
                )}
              </Stack>
              <Button width="20%" background="primary" color="white" onClick={() => submitHandler()} height="50px">
                <Text fontSize="20px" variant="textInput" color="white">
                  Simpan
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default TroubleReport;
