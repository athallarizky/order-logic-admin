import React, { ReactNode } from 'react';
import { useDisclosure, Drawer, DrawerContent, Box } from '@chakra-ui/react';

import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="sidebar">
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Mobile Navigation */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </Box>
  );
};

export default Sidebar;
