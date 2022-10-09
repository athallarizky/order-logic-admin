import React from 'react';
import { Box, Flex, Text, useColorModeValue, BoxProps, CloseButton } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from 'react-icons/fi';
import { IconType } from 'react-icons';
import NavItem from './NavItem';
/**
 * Menu Lists
 */
interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

/**
 * Sidebar Content
 */

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      shadow="base"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
