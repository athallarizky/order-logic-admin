import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Components
import PageContainer from '@/components/layout/PageContainer';
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

// Date & Helper
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isEmptyString } from '@/helper/utils';
import useIsMounted from 'hooks/useIsMounted';

// Hooks and API
import useSWR, { mutate } from 'swr';
import fetcher from 'helper/fetcher';
import sender from 'helper/sender';
import type {
  AgentListResponse,
  STOListResponse,
  JenisGangguanListResponse,
  TroubleResponse,
} from '@/interfaces/response';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTroubleReport = () => {
  const router = useRouter();
  const { id } = router.query;
  const isMounted = useIsMounted();
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<string | 'success' | 'error'>('');
  const [tanggal, setTanggal] = useState(new Date());
  const [troubleData, setTroubleData] = useState(null);

  useSWR(
    isMounted ? `fetchDetailTroubleData` : null,
    async () => {
      const response = await fetcher<TroubleResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/?id=${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      setTroubleData(response.data);
      return response;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

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

  const handleChangeTanggal = value => {
    const formatedTanggal = format(new Date(value), 'yyyy-MM-dd');
    setTanggal(value);
    setTroubleData(prevState => ({
      ...prevState,
      tanggal: formatedTanggal,
    }));
  };

  const handleChangeValue = e => {
    // eslint-disable-next-line prefer-const
    let { name, value } = e.target;
    if (name === 'id_sto' || name === 'id_gangguan' || name === 'id_agent') {
      value = Number(value);
    }

    setTroubleData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    setResponseMessage('');
    setResponseStatus('error');
    const { no_tiket, no_internet, no_telp, id_sto, source, id_agent, id_gangguan, perbaikan } = troubleData;

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

    let updatedField = troubleData;
    if (tanggal && tanggal !== null) {
      updatedField = Object.assign(troubleData, { tanggal: format(new Date(tanggal), 'yyyy-MM-dd') });
    }

    const response = await sender('/api/v1/update', { data: updatedField }, localStorage.getItem('token'), 'PUT');

    if (response.status === 200) {
      toast.success(response.message, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light',
      });
      mutate('fetchDetailTroubleData');
    } else {
      toast.error(response.message, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light',
      });
    }
  };

  return (
    <PageContainer>
      <ToastContainer />

      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Update Gangguan Logic
        </Text>
        <Flex>
          <Flex className="form-group" flexDirection="column" width="100%">
            {/* Date and Source */}
            <Flex mb="2vh" justify="space-between">
              <FormControl mb="2vh" width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Tanggal <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <DatePicker
                  // selected={tanggal}
                  dateFormat="dd-MM-yyyy"
                  // dateFormat="DD-MM-YYYY"
                  selected={troubleData ? new Date(troubleData.tanggal) : tanggal}
                  onChange={(date: Date) => handleChangeTanggal(date)}
                  className="datepicker-input"
                />
              </FormControl>

              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    No Tiket <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => handleChangeValue(e)}
                  name="no_tiket"
                  isRequired
                  variant="outline"
                  color="black"
                  defaultValue={troubleData?.no_tiket}
                />
              </FormControl>
            </Flex>

            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Source <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Select
                  name="source"
                  placeholder="Select option"
                  onChange={e => handleChangeValue(e)}
                  isRequired
                  variant="outline"
                  color="black"
                  value={troubleData?.source.toLowerCase() === 'draft' ? 'draft' : 'group'}
                >
                  <option value="draft">Draft</option>
                  <option value="group">Group</option>
                </Select>
              </FormControl>

              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    No Internet <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  name="no_internet"
                  isRequired
                  onChange={e => handleChangeValue(e)}
                  variant="outline"
                  color="black"
                  defaultValue={troubleData?.no_internet}
                />
              </FormControl>
            </Flex>

            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    No Telepon <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => handleChangeValue(e)}
                  name="no_telp"
                  isRequired
                  variant="outline"
                  color="black"
                  defaultValue={troubleData?.no_telp}
                />
              </FormControl>

              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Kode STO <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Flex align="center">
                  <Select
                    name="id_sto"
                    placeholder="Select option"
                    width="100%"
                    onChange={e => handleChangeValue(e)}
                    variant="outline"
                    color="black"
                    value={troubleData?.id_sto}
                  >
                    {sto_data?.data?.map(sto => (
                      <option value={sto.id}>{sto.sto_name}</option>
                    ))}
                  </Select>
                </Flex>
              </FormControl>
            </Flex>

            <Flex align="center" mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Jenis Gangguan <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Flex align="center">
                  <Select
                    placeholder="Select option"
                    width="100%"
                    name="id_gangguan"
                    isRequired
                    onChange={e => handleChangeValue(e)}
                    value={troubleData?.id_gangguan}
                    variant="outline"
                    color="black"
                  >
                    {jenis_gangguan?.data?.map(gangguan => (
                      <option value={gangguan.id}>{gangguan.jenis_gangguan}</option>
                    ))}
                  </Select>
                </Flex>
              </FormControl>

              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Nama Agent <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Flex align="center">
                  <Select
                    name="id_agent"
                    placeholder="Select option"
                    width="100%"
                    onChange={e => handleChangeValue(e)}
                    value={troubleData?.id_agent}
                    isRequired
                    variant="outline"
                    color="black"
                  >
                    {agent_data?.data?.map(agent => (
                      <option value={agent.id}>{agent.name_agent}</option>
                    ))}
                  </Select>
                </Flex>
              </FormControl>
            </Flex>

            <FormControl mb="2vh">
              <FormLabel>
                <Text variant="textInput">
                  Perbaikan <span style={{ color: 'red' }}>*</span>
                </Text>
              </FormLabel>
              <Input
                type="text"
                onChange={e => handleChangeValue(e)}
                name="perbaikan"
                isRequired
                defaultValue={troubleData?.perbaikan}
                variant="outline"
                color="black"
              />
            </FormControl>

            <FormControl mb="2vh">
              <FormLabel>Detail Gangguan</FormLabel>
              <Textarea
                onChange={e => handleChangeValue(e)}
                name="detail_gangguan"
                defaultValue={troubleData?.detail_gangguan}
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
              <Flex w="100%" align="center" justify="center">
                <Button
                  mx="1rem"
                  width="20%"
                  background="white"
                  border="2px solid red"
                  onClick={() => router.replace('/trouble-report')}
                  height="50px"
                >
                  <Text fontSize="20px" variant="textInput" color="primary">
                    Batalkan
                  </Text>
                </Button>
                <Button
                  mx="1rem"
                  width="20%"
                  background="primary"
                  color="white"
                  onClick={() => submitHandler()}
                  height="50px"
                >
                  <Text fontSize="20px" variant="textInput" color="white">
                    Simpan
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default EditTroubleReport;
