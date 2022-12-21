import React from 'react';
import Link from 'next/link';
import { Box, Flex, Text, BoxProps, CloseButton } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './NavItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  subMenu: string | null;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/', subMenu: null },
  { name: 'Assurance', icon: FiTrendingUp, href: '/assurance', subMenu: 'assurance' },
  { name: 'Performansi', icon: FiStar, href: '/performansi', subMenu: null },
];

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  return (
    <Box background="#DF362D" shadow="base" w={{ base: 'full', md: 60 }} pos="fixed" h="full" {...rest} color="#FFFFFF">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Order Logic
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <Link href={link.href}>
          <NavItem key={link.name} icon={link.icon} navUrl={link.href} subMenu={link.subMenu}>
            {link.name}
          </NavItem>
        </Link>
      ))}
      <Link href="/ads">
        <NavItem icon={FiStar} navUrl="/dsaa">
          Logout
        </NavItem>
      </Link>
    </Box>
  );
};

export default SidebarContent;
