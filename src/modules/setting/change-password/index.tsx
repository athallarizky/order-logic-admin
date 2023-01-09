import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Alert,
  AlertIcon,
  Stack,
} from '@chakra-ui/react';

// Library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import PageContainer from '@/components/layout/PageContainer';

// Integrate API
import useSWR, { mutate } from 'swr';
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState<{
    old_password: null | string;
    new_password: null | string;
    confirm_password: null | string;
  }>({
    old_password: null,
    new_password: null,
    confirm_password: null,
  });

  const [responseMessage, setResponseMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<string | 'success' | 'error'>('');

  const handleChangeValue = e => {
    setResponseMessage('');
    setResponseStatus('');
    const { name, value } = e.target;

    setPasswordData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (passwordData.new_password !== null && passwordData.confirm_password !== null) {
      if (passwordData.new_password !== passwordData.confirm_password) {
        setResponseMessage('Password Baru Tidak Sesuai');
        setResponseStatus('error');
      } else {
        setResponseMessage('');
        setResponseStatus('');
      }
    }
  }, [passwordData]);

  const handleUpdatePassword = async ({ old_password, new_password, confirm_password }) => {
    if (old_password !== null) {
      if (new_password !== null && confirm_password !== null) {
        if (new_password === confirm_password) {
          const response = await sender(
            '/api/v1/setting/change',
            {
              data: {
                old_password,
                new_password,
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
            setResponseMessage(response.message);
            setResponseStatus('error');
            toast.error(response.message, {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              theme: 'light',
            });
          }
        }
      }
    } else {
      setResponseMessage('Password Lama Tidak Boleh Kosong');
      setResponseStatus('error');
    }
  };
  return (
    <PageContainer>
      <ToastContainer />

      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Ubah Password
        </Text>
        <Flex className="old-password" direction="column" mb="2vh">
          <FormControl width="48%">
            <FormLabel>
              <Text variant="textInput">
                Password Lama <span style={{ color: 'red' }}>*</span>
              </Text>
            </FormLabel>
            <Input
              type="password"
              name="old_password"
              isRequired
              variant="outline"
              color="black"
              onChange={e => handleChangeValue(e)}
            />
          </FormControl>
        </Flex>
        <Divider orientation="horizontal" background="#999" width="48%" my="2em" />
        <Flex className="new-password" direction="column" mb="2vh">
          <FormControl width="48%" mb="3vh">
            <FormLabel>
              <Text variant="textInput">
                Password Baru <span style={{ color: 'red' }}>*</span>
              </Text>
            </FormLabel>
            <Input
              type="password"
              name="new_password"
              isRequired
              variant="outline"
              color="black"
              onChange={e => handleChangeValue(e)}
            />
          </FormControl>
          <FormControl width="48%">
            <FormLabel>
              <Text variant="textInput">
                Konfirmasi Password Baru <span style={{ color: 'red' }}>*</span>
              </Text>
            </FormLabel>
            <Input
              type="password"
              name="confirm_password"
              isRequired
              variant="outline"
              color="black"
              onChange={e => handleChangeValue(e)}
              // defaultValue={userData?.full_name}
            />
          </FormControl>
        </Flex>
        <Stack spacing={3} mb="3vh">
          {responseMessage && (
            <Alert status={responseStatus === 'success' ? 'success' : 'error'}>
              <AlertIcon />
              {responseMessage}
            </Alert>
          )}
        </Stack>
      </Flex>
      <Flex w="100%" align="center" justify="center" direction="column">
        <Button
          mx="1rem"
          width="20%"
          background="primary"
          color="white"
          onClick={() => handleUpdatePassword(passwordData)}
          height="50px"
        >
          <Text fontSize="20px" variant="textInput" color="white">
            Simpan Biodata User
          </Text>
        </Button>
      </Flex>
    </PageContainer>
  );
};

export default ChangePassword;
