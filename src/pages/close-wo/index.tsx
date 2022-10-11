import * as React from 'react';
import axios from '@/configs/axiosConfig';

import dynamic from 'next/dynamic';
import { NextPage } from '@/interfaces/next';

// Interfaces
import { FormWoDataListResponse } from '@/interfaces/response';

const CloseWo = dynamic(() => import('modules/closeWo'));

export async function getServerSideProps(ctx) {
  const formWoListReq = await axios.get('http://localhost:3030/api/close-wo-api');
  const formWoList = formWoListReq.data;

  return {
    props: {
      formDataList: formWoList,
    },
  };
}
interface CloseWoPageProps {
  formDataList?: {
    data?: FormWoDataListResponse[];
  };
}
const CloseWoPage: NextPage<CloseWoPageProps> = props => {
  return <CloseWo {...props} />;
};

export default CloseWoPage;
