import React from 'react';
import Link from 'next/link';
import { Box, Flex, Text, useColorModeValue, BoxProps, CloseButton } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './NavItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Close WO Logic', icon: FiTrendingUp, href: '/close-wo' },
  { name: 'Rekap WO Logic', icon: FiCompass, href: '#' },
  { name: 'Performansi', icon: FiStar, href: '#' },
];

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  return (
    <Box background="#2A2E45" shadow="base" w={{ base: 'full', md: 60 }} pos="fixed" h="full" {...rest} color="#FFFFFF">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Order Logic
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <Link href={link.href}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

export default SidebarContent;
