import React, { useState } from 'react';

// Components
import { Flex, Text, FormControl, FormLabel, Input, Select, Stack, Button, Alert, AlertIcon } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Helper
import { isEmptyString } from '@/helper/utils';

// Integrate API
import sender from 'helper/sender';
import fetcher from 'helper/fetcher';

const EditUser = () => {
  return <div>EditUser</div>;
};

export default EditUser;
