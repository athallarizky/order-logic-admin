import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Text,
  Tag,
  Box,
} from '@chakra-ui/react';

type ModalAddStoProps = {
  isOpen: boolean;
  onClose: () => void;
  confirmMessage: string;
  forwardedFunction: () => void;
};

const ModalConfirm: React.FC<ModalAddStoProps> = ({ isOpen, onClose, confirmMessage, forwardedFunction }) => {
  const handleClickYes = async () => {
    await forwardedFunction();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="200px" minH="200px">
        <ModalHeader>Konfirmasi</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black" padding="5% 10%">
          <Flex mb="5vh" textAlign="center" justify="center" align="center">
            <Text fontSize="25px">{confirmMessage}</Text>
          </Flex>
          <Flex className="action-wrapper" justify="center">
            <Button background="white" color="primary" mr={3} marginX="10px" onClick={onClose}>
              <Text fontSize="20px">Tidak</Text>
            </Button>
            <Button background="primary" color="white" marginX="10px" height="40px" onClick={handleClickYes}>
              <Text fontSize="20px">Ya</Text>
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
