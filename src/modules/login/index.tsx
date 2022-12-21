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

const Login = () => {
  const [fields, setFields] = useState({
    nik: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

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
      response = await sender('/api/v1/auth/login', { data: fields });
      if (response.status === 200) {
        window.localStorage.setItem('user', JSON.stringify(response.data.user));
        window.localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
        await router.push('/');
      }
    } catch (error) {
      // console.log('error.response', error.response);
      setErrorMessage(error.response.data.message);
    }

    // console.log(response);

    // console.log('response.status', response);

    // setFields({
    //   nik: '',
    //   password: '',
    // });
    // if (response) {
    //   return 'success';
    // }

    // return 'failed';

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
