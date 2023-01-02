import React, { useState } from 'react';

// Components
import { Flex, Text, FormControl, FormLabel, Input, Select, Stack, Button, Alert, AlertIcon } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper & Hooks
import { isEmptyString } from '@/helper/utils';
import useIsMounted from 'hooks/useIsMounted';

// Integrate API
import useSWR, { mutate } from 'swr';
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';
import type { UserDataResponse } from '@/interfaces/response';

const EditUser = () => {
  const isMounted = useIsMounted();
  const [userData, setUserData] = useState(null);

  useSWR(
    isMounted ? `fetchDetailTroubleData` : null,
    async () => {
      const response = await fetcher<UserDataResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/getUser?id=${id}`,
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

  return (
    <PageContainer>
      <ToastContainer />

      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Input New User
        </Text>
        <Flex>
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
                  onChange={e => fieldHandler(e)}
                  name="full_name"
                  isRequired
                  variant="outline"
                  color="black"
                  // value={}fields.full_name}
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
                  onChange={e => fieldHandler(e)}
                  // value={}fields.level}
                  isRequired
                  variant="outline"
                  color="black"
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
                  onChange={e => fieldHandler(e)}
                  name="national_identity_number"
                  isRequired
                  variant="outline"
                  color="black"
                  // value={}fields.national_identity_number}
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
                  onChange={e => fieldHandler(e)}
                  isRequired
                  variant="outline"
                  color="black"
                >
                  <option value="Aktif" selected>
                    Aktif
                  </option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex mb="2vh" justify="space-between">
              <FormControl width="48%">
                <FormLabel>
                  <Text variant="textInput">
                    Password <span style={{ color: 'red' }}>*</span>
                  </Text>
                </FormLabel>
                <Input
                  type="text"
                  onChange={e => fieldHandler(e)}
                  name="password"
                  isRequired
                  variant="outline"
                  color="black"
                  // value={}fields.password}
                />
              </FormControl>
            </Flex>
            <Text variant="textInput">
              <span style={{ color: 'red' }}>*</span>wajib diisi
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" direction="column" mt="5vh">
          {/* <Stack spacing={3} mb="3vh">
            {responseMessage && (
              <Alert status={responseStatus === 'success' ? 'success' : 'error'}>
                <AlertIcon />
                {responseMessage}
              </Alert>
            )}
          </Stack> */}
          <Button width="20%" background="primary" color="white" onClick={() => submitHandler()} height="50px">
            <Text fontSize="20px" variant="textInput" color="white">
              Simpan
            </Text>
          </Button>
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default EditUser;
