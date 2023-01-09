import React, { useState } from 'react';
import { useRouter } from 'next/router';
// Components
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Alert,
  AlertIcon,
  Divider,
} from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowBack } from 'react-icons/io';

// Helper & Hooks
import { isEmptyString } from '@/helper/utils';
import useIsMounted from 'hooks/useIsMounted';

// Integrate API
import useSWR, { mutate } from 'swr';
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';
import type { UserDataResponse, UserData } from '@/interfaces/response';

const EditUser = () => {
  const isMounted = useIsMounted();
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useSWR(
    isMounted ? `fetchDetailUser` : null,
    async () => {
      const response = await fetcher<UserDataResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/viewUser?id=${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        },
      );
      setUserData(response.data);
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

  const [responseMessage, setResponseMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<string | 'success' | 'error'>('');

  const handleChangeValue = e => {
    const { name, value } = e.target;
    setResponseMessage('');
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateBiodata = async ({ id: userID, full_name, level, national_identity_number, status }: UserData) => {
    setResponseMessage('');
    setResponseStatus('');
    const stillEmpty =
      isEmptyString(full_name) ||
      isEmptyString(level) ||
      isEmptyString(national_identity_number) ||
      isEmptyString(status);

    if (stillEmpty) {
      setResponseMessage('Masih Ada Data yang Kosong!');
      setResponseStatus('error');
    }

    const response = await sender(
      '/api/v1/admin/updateUser',
      {
        data: {
          id: userID,
          full_name,
          level,
          national_identity_number,
          status,
        },
      },
      localStorage.getItem('token'),
      'PUT',
    );
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
    }
    await mutate('fetchDetailUser');
    return response;
  };

  const [passwordResponseMessage, setPasswordResponseMessage] = useState<string>('');
  const [passwordResponseStatus, setPasswordResponseStatus] = useState<string | 'success' | 'error'>('');

  const handleUpdatePassword = async ({
    id: userID,
    full_name,
    level,
    national_identity_number,
    status,
    password,
  }: UserData) => {
    setPasswordResponseMessage('');
    setPasswordResponseStatus('');

    const stillEmpty =
      isEmptyString(password) ||
      isEmptyString(full_name) ||
      isEmptyString(level) ||
      isEmptyString(national_identity_number) ||
      isEmptyString(status);

    if (stillEmpty) {
      setPasswordResponseMessage('Masih Ada Data yang Kosong!');
      setPasswordResponseStatus('error');
    }

    const response = await sender(
      '/api/v1/admin/updateUser',
      {
        data: {
          id: userID,
          full_name,
          password,
          level,
          national_identity_number,
          status,
        },
      },
      localStorage.getItem('token'),
      'PUT',
    );

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
    }
    await mutate('fetchDetailUser');
    return response;
  };

  return (
    <PageContainer>
      <ToastContainer />

      <Flex flexDirection="column">
        <Flex align="center">
          <Button
            mx="1rem"
            width="50px"
            background="white"
            border="2px solid gray"
            onClick={() => router.replace('/admin/user-management')}
            // height="50px"
          >
            <Text fontSize="20px" variant="textInput" color="gray">
              <IoIosArrowBack />
            </Text>
          </Button>
          <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
            Update User
          </Text>
        </Flex>
        <Flex className="biodata-user" direction="column">
          <Text fontSize="2rem" mt="5vh" mb="5vh">
            Update Biodata User
          </Text>
          <Flex className="form-group" flexDirection="column" width="100%">
            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Full Name <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  name="full_name"
                  isRequired
                  variant="outline"
                  color="black"
                  onChange={e => handleChangeValue(e)}
                  defaultValue={userData?.full_name}
                />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Level <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Select
                  name="level"
                  placeholder="Select option"
                  isRequired
                  variant="outline"
                  color="black"
                  defaultValue={userData?.full_name}
                  onChange={e => handleChangeValue(e)}
                  value={userData?.level === 'Admin' ? 'Admin' : 'Member'}
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    NIK <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  name="national_identity_number"
                  isRequired
                  variant="outline"
                  color="black"
                  onChange={e => handleChangeValue(e)}
                  defaultValue={userData?.national_identity_number}
                />
              </FormControl>
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Status <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Select
                  name="status"
                  placeholder="Select option"
                  isRequired
                  variant="outline"
                  color="black"
                  onChange={e => handleChangeValue(e)}
                  value={userData?.status === 'Aktif' ? 'Aktif' : 'Tidak Aktif'}
                >
                  <option value="Aktif" selected>
                    Aktif
                  </option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </Select>
              </FormControl>
            </Flex>

            <Text variant="textInput">
              <span style={{ color: 'red' }}>*</span>wajib diisi
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" align="center" justify="center" direction="column">
          <Stack spacing={3} mb="3vh">
            {responseMessage && (
              <Alert status={responseStatus === 'success' ? 'success' : 'error'}>
                <AlertIcon />
                {responseMessage}
              </Alert>
            )}
          </Stack>
          <Button
            mx="1rem"
            width="20%"
            background="primary"
            color="white"
            onClick={() => handleUpdateBiodata(userData)}
            height="50px"
          >
            <Text fontSize="20px" variant="textInput" color="white">
              Simpan Biodata User
            </Text>
          </Button>
        </Flex>

        <Divider orientation="horizontal" my="4vh" />

        <Flex direction="column">
          <Text fontSize="2rem" mt="5vh" mb="5vh">
            Update Password User
          </Text>
          <Flex mb="2vh" alignItems="flex-end">
            <FormControl width="48%">
              <FormLabel>
                <Text variant="textInput">Password Baru</Text>
              </FormLabel>
              <Input
                type="password"
                name="password"
                isRequired
                variant="outline"
                color="black"
                onChange={e => handleChangeValue(e)}
              />
            </FormControl>
            <Button
              mx="1rem"
              width="15%"
              background="primary"
              color="white"
              onClick={() => handleUpdatePassword(userData)}
              height="40px"
            >
              <Text fontSize="20px" variant="textInput" color="white">
                Ganti Password
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default EditUser;
