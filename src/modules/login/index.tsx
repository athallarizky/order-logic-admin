import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Input,
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
// import useSWR, { mutate } from 'swr';
import sender from 'helper/sender';
import { isEmptyString } from '@/helper/utils';
import axios from 'configs/axiosConfig';
import useUserStore from 'stores/useUserStore';

const Login = () => {
  const [fields, setFields] = useState({
    nik: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const { setToken, setUserData } = useUserStore(state => state);

  const fieldHandler = e => {
    const name = e.target.getAttribute('name');
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    const stillEmpty = isEmptyString(fields.nik) || isEmptyString(fields.password);

    const stillNull = fields.password === null || fields.nik === null;

    if (stillEmpty || stillNull) {
      setErrorMessage('Fields is Empty');
      return 'Failed';
    }

    let response;

    try {
      response = await sender('/api/v1/auth/login', { data: fields }, localStorage.getItem('token'));
      if (response.status === 200) {
        const { token, user } = response.data;
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('token', token);
        setToken(token);
        setUserData(user);
        await router.push('/');
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log('error.response', error.response);
    }

    return response;
  };

  return (
    <Flex justify="center" align="center" bg="primary" width="100%" height="100vh">
      <Flex bg="white" width="40%" height="65vh" borderRadius="8px" padding="2%" direction="column">
        <Heading as="h1" size="xl" textAlign="center" mb="8vh">
          Welcome
        </Heading>
        <Flex direction="column">
          <FormControl mb="2vh">
            <FormLabel>NIK</FormLabel>
            <Input type="text" name="nik" onChange={e => fieldHandler(e)} />
          </FormControl>
          <FormControl mb="2vh">
            <FormLabel>Password</FormLabel>
            <Input type="text" name="password" onChange={e => fieldHandler(e)} />
          </FormControl>
          {errorMessage !== '' && (
            <Alert status="error" mb="3vh">
              <AlertTitle>Failed!</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button bg="primary" w="30%" color="white" mb="2vh" mx="auto" onClick={() => handleSubmit()}>
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
