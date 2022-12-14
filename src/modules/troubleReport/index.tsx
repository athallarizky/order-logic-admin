/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
// Hooks & Interface
import { useRouter } from 'next/router';
import useIsMounted from 'hooks/useIsMounted';
import { TroubleResponse } from 'interfaces/response';
import useSWR, { mutate } from 'swr';
import fetcher from 'helper/fetcher';
import sender from 'helper/sender';

// Library
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { Box, Flex, Text, Button, useDisclosure } from '@chakra-ui/react';
import PageContainer from '@/components/layout/PageContainer';
import { RiAddFill, RiDeleteBin5Fill, RiEditBoxFill } from 'react-icons/ri';

// Modals
import ConfirmModal from 'components/shared/Modal.Confirm';
import FilterModal from './components/FilterModal';
import DetailModal from './components/DetailModal';

const TroubleReport = () => {
  const { isOpen: isOpenFilterModal, onOpen: onOpenFilterModal, onClose: onCloseFilterModal } = useDisclosure();
  const { isOpen: isOpenDetailModal, onOpen: onOpenDetailModal, onClose: onCloseDetailModal } = useDisclosure();
  const { isOpen: isOpenConfirmModal, onOpen: onOpenConfirmModal, onClose: onCloseConfirmModal } = useDisclosure();
  const [modalData, setModalData] = useState(null);
  const [troubleData, setTroubleData] = useState(null);
  const [deletedIdData, setDeletedIdData] = useState(null);
  const router = useRouter();

  const isMounted = useIsMounted();

  useSWR(
    isMounted ? `fetchTroubleData` : null,
    async () => {
      const response = await fetcher<TroubleResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      setTroubleData(response.data);
    },
    {
      revalidateOnFocus: false,
    },
  );

  const handleOpenDetailModal = data => {
    setModalData(data);
    onOpenDetailModal();
  };

  const handleOpenConfirmModal = dataId => {
    onOpenConfirmModal();
    setDeletedIdData(dataId);
  };

  const handleDeleteData = async () => {
    if (deletedIdData !== null) {
      const response = await sender(`/api/v1/?id=${deletedIdData}`, null, localStorage.getItem('token'), 'DELETE');
      if (response.status === 200) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: 'light',
        });
        mutate(`fetchTroubleData`);
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
    } else {
      toast.error('Gagal, Id Kosong, Silahkan Coba lagi!', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light',
      });
    }

    // console.log(deletedIdData);
    // setDeletedIdData(null);
  };

  const columns = [
    {
      name: 'Tanggal',
      selector: row => format(new Date(row.tanggal), 'yyyy-MM-dd'),
      sortable: true,
      grow: 0,
    },
    {
      name: 'No. Tiket',
      selector: row => row.no_tiket,
      sortable: true,
      grow: 0,
    },
    {
      name: 'Source',
      selector: row => row.source,
      sortable: true,
      grow: 0,
    },
    {
      name: 'Kode STO',
      selector: row => row.sto,
      grow: 0,
    },
    {
      name: 'No. Internet',
      selector: row => row.no_internet,
      grow: 0,
    },
    {
      name: 'No. Telepon',
      selector: row => row.no_telp,
      grow: 0,
    },
    {
      name: 'Jenis Gangguan',
      selector: row => row.jenis_gangguan,
      grow: 0,
    },
    {
      name: 'Detail Gangguan',
      selector: row => row.detail_gangguan,
      grow: 0,
    },
    {
      name: 'Perbaikan',
      selector: row => row.perbaikan,
      grow: 0,
    },
    {
      name: 'Agen',
      selector: row => row.agent,
      grow: 0,
    },
    {
      name: 'Aksi',
      cell: row => {
        return (
          <Flex width="100%" justify="space-around">
            <Button onClick={() => handleOpenDetailModal(row)} height="30px" background="primary">
              <Text fontSize="15px" color="white">
                Detail
              </Text>
            </Button>
            <Button onClick={() => router.push(`/trouble-report/edit/${row.id}`)} height="30px" background="primary">
              <RiEditBoxFill className="icon" color="white" />
            </Button>
            <Button onClick={() => handleOpenConfirmModal(row.id)} height="30px" background="primary">
              <RiDeleteBin5Fill className="icon" color="white" />
            </Button>
          </Flex>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '18%',
    },
  ];

  const handleResetFilter = () => {
    mutate('fetchTroubleData');
  };

  return (
    <PageContainer>
      <ToastContainer />
      <FilterModal isOpen={isOpenFilterModal} onClose={onCloseFilterModal} setTroubleData={setTroubleData} />
      <DetailModal isOpen={isOpenDetailModal} onClose={onCloseDetailModal} troubleData={modalData} />
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={onCloseConfirmModal}
        confirmMessage="Anda yakin ingin menghapus data?"
        forwardedFunction={() => handleDeleteData()}
      />
      <Flex flexDirection="column">
        <Text variant="heading" fontSize="3rem" mt="5vh" mb="5vh">
          Rekap Gangguan Logic
        </Text>
        <Flex mb="4vh" justify="space-between" align="center">
          <Box className="left-action">
            <Button onClick={onOpenFilterModal} background="primary" height="30px">
              <Text color="#FFF" fontSize="15px">
                Filter
              </Text>
            </Button>
            <Button onClick={() => handleResetFilter()}>
              <Text color="black" fontSize="15px">
                Reset Filter
              </Text>
            </Button>
          </Box>
          <Box className="right-action">
            <Button onClick={() => router.push('/trouble-report/create')} height="30px" background="primary">
              <RiAddFill className="icon" color="white" style={{ marginRight: '5px' }} />
              <Text fontSize="15px" color="white">
                Tambah Data
              </Text>
            </Button>
          </Box>
        </Flex>
        <DataTable columns={columns} data={troubleData ?? []} striped selectableRows={false} />
      </Flex>
    </PageContainer>
  );
};

export default TroubleReport;
