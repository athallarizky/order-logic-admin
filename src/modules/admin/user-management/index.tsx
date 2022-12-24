import React from 'react';
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Button, TableContainer, Text, Icon, Switch } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import useIsMounted from 'hooks/useIsMounted';
import useSWR, { mutate } from 'swr';
import fetcher from 'helper/fetcher';
import { FiEdit } from 'react-icons/fi';
import sender from 'helper/sender';

const UserManagement = () => {
  const isMounted = useIsMounted();

  const { data: user_list } = useSWR(isMounted ? `fetchUserList` : null, async () => {
    const response = await fetcher<any>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/getUser`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  });

  const handleSetActiveUser = async ({ id, full_name, level, national_identity_number, password, status }) => {
    const changeStatus = status === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
    const response = await sender(
      '/api/v1/admin/updateUser',
      {
        data: {
          id,
          full_name,
          level,
          national_identity_number,
          password,
          status: changeStatus,
        },
      },
      localStorage.getItem('token'),
      'PUT',
    );
    mutate('fetchUserList');
    console.log('response', response);
  };

  return (
    <PageContainer>
      <Flex className="user-list-wrapper" direction="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          User Management
        </Text>
        <TableContainer width="100%">
          <Table variant="simple" colorScheme="red">
            <Thead>
              <Tr>
                <Th textAlign="center">Name</Th>
                <Th textAlign="center">NIK</Th>
                <Th textAlign="center">User Status</Th>
                <Th textAlign="center">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user_list?.users?.map(user => (
                <Tr>
                  <Td textAlign="center">{user.full_name}</Td>
                  <Td textAlign="center">{user.national_identity_number}</Td>
                  <Td textAlign="center">
                    <Switch
                      size="lg"
                      // style={{ background: 'red' }}
                      colorScheme="red"
                      sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: '#00000040' } }}
                      defaultChecked={user.status === 'Aktif'}
                      onChange={() => handleSetActiveUser(user)}
                    />
                  </Td>
                  <Td textAlign="center">
                    <Button background="primary">
                      <Icon fontSize="15px" color="white" mr="8px" as={FiEdit} />
                      <Text color="white" fontSize="15px">
                        Edit
                      </Text>
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </PageContainer>
  );
};

export default UserManagement;
