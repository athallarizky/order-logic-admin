import React, { useState, useCallback } from 'react';
import { Flex, Heading, FormControl, FormLabel, Button, Input } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import sender from 'helper/sender';
import { isEmptyString } from '@/helper/utils';

const Login = () => {
  const [fields, setFields] = useState({
    nik: '',
    password: '',
  });
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const fieldHandler = e => {
    const name = e.target.getAttribute('name');
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const stillEmpty = isEmptyString(fields.nik) || isEmptyString(fields.password);

    const stillNull = fields.password === null || fields.nik === null;

    if (stillEmpty || stillNull) {
      setIsFailed(true);
      return 'Failed';
    }

    const response = await sender('/api/v1/auth/login', { data: fields });
    console.log('response', response);

    setFields({
      nik: '',
      password: '',
    });

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
          <FormControl mb="8vh">
            <FormLabel>Password</FormLabel>
            <Input type="text" name="password" onChange={e => fieldHandler(e)} />
          </FormControl>
          <Button bg="primary" w="30%" color="white" mx="auto" onClick={() => handleSubmit()}>
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
