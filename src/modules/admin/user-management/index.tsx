import React from 'react';
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Text,
  Icon,
  Switch,
  Select,
  Box,
} from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import useIsMounted from 'hooks/useIsMounted';
import useSWR, { mutate } from 'swr';
import fetcher from 'helper/fetcher';
import { RiAddFill } from 'react-icons/ri';
import sender from 'helper/sender';
import useUserStore from 'stores/useUserStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
  const isMounted = useIsMounted();
  const { userData } = useUserStore(state => state);
  const { data: user_list } = useSWR(isMounted ? `fetchUserList` : null, async () => {
    const response = await fetcher<any>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/getUser`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  });

  const handleUpdateUser = async (updateType, { id, full_name, level, national_identity_number, password, status }) =>
    // event = null,
    {
      let changeStatus: string = status;
      if (updateType === 'updateStatus') {
        if (status === 'Aktif') {
          changeStatus = 'Tidak Aktif';
        } else {
          changeStatus = 'Aktif';
        }
        // = updateType === 'updateStatus' && status === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
      }
      let changeLevel: string = level;
      if (updateType === 'updateLevel') {
        if (level === 'Admin') {
          changeLevel = 'Member';
        } else {
          changeLevel = 'Admin';
        }
      }
      const response = await sender(
        '/api/v1/admin/updateUser',
        {
          data: {
            id,
            full_name,
            level: changeLevel,
            national_identity_number,
            status: changeStatus,
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
      console.log(response.status);
      await mutate('fetchUserList');
      return response;
    };

  return (
    <PageContainer>
      <ToastContainer />
      <Flex className="user-list-wrapper" direction="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          User Management
        </Text>
        <Flex mb="4vh" justify="flex-end" align="center">
          <Box className="left-action">
            <Button background="primary" height="30px">
              <RiAddFill className="icon" color="white" style={{ marginRight: '5px' }} />
              <Text fontSize="15px" color="white">
                Tambah User
              </Text>
            </Button>
          </Box>
        </Flex>
        <TableContainer width="100%">
          <Table variant="simple" colorScheme="red">
            <Thead>
              <Tr>
                <Th textAlign="center">Name</Th>
                <Th textAlign="center">NIK</Th>
                <Th textAlign="center">User Status</Th>
                <Th textAlign="center">User Level</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user_list?.users
                ?.filter(data => data.national_identity_number !== userData.national_identity_number)
                .map(user => (
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
                        isChecked={user.status === 'Aktif'}
                        onChange={() => handleUpdateUser('updateStatus', user)}
                      />
                    </Td>
                    <Td textAlign="center">
                      <Select onChange={() => handleUpdateUser('updateLevel', user)}>
                        <option value="Admin" selected={user.level === 'Admin'}>
                          Admin
                        </option>
                        <option value="Member" selected={user.level === 'Member'}>
                          Member
                        </option>
                      </Select>
                    </Td>
                    {/* <Td textAlign="center">
                      <Button background="primary">
                        <Icon fontSize="15px" color="white" mr="8px" as={FiEdit} />
                        <Text color="white" fontSize="15px">
                          Edit
                        </Text>
                      </Button>
                    </Td> */}
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
