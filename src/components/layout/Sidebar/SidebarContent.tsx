import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Flex, Text, BoxProps, CloseButton } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiStar, FiUsers, FiLogOut, FiSettings } from 'react-icons/fi';
import { IconType } from 'react-icons';
import useUserStore from 'stores/useUserStore';
import NavItem from './NavItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  subMenu: string | null;
  isOpen?: undefined | boolean;
  onClick?: () => void;
}

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  const router = useRouter();
  const { userData } = useUserStore();

  const [isAssuranceOpen, setIsAssuranceOpen] = React.useState<boolean>(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = React.useState<boolean>(false);
  const [isSettingOpen, setIsSettingOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    // const firstPath = router.pathname.split('/')[1];
    const path = window.location.href;

    if (path.indexOf('trouble-report') > -1) {
      setIsAssuranceOpen(true);
    } else if (path.indexOf('user-management') > -1) {
      setIsUserManagementOpen(true);
    }
  }, [router]);

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome, href: '/', subMenu: null, onClick: () => router.replace('/') },
    {
      name: 'Assurance',
      icon: FiStar,
      href: '#',
      subMenu: 'assurance',
      isOpen: isAssuranceOpen,
      onClick: () => setIsAssuranceOpen(!isAssuranceOpen),
    },
    {
      name: 'Performansi',
      icon: FiTrendingUp,
      href: '/performansi',
      subMenu: null,
      onClick: () => router.replace('/performansi'),
    },
    {
      name: 'Setting',
      icon: FiSettings,
      href: '#',
      subMenu: 'settings',
      isOpen: isSettingOpen,
      onClick: () => setIsSettingOpen(!isSettingOpen),
    },
  ];

  const AdminLinkItems: Array<LinkItemProps> = [
    {
      name: 'User Management',
      icon: FiUsers,
      href: '#',
      subMenu: 'user-management',
      isOpen: isUserManagementOpen,
      onClick: () => setIsUserManagementOpen(!isUserManagementOpen),
    },
  ];

  const handleLogout = async () => {
    await localStorage.removeItem('user');
    await localStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <Box background="#DF362D" shadow="base" w={{ base: 'full', md: 60 }} pos="fixed" h="full" {...rest} color="#FFFFFF">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Order Logic
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <Box onClick={link.onClick}>
          <NavItem key={link.name} icon={link.icon} navUrl={link.href} subMenu={link.subMenu} isOpen={link.isOpen}>
            {link.name}
          </NavItem>
        </Box>
      ))}
      {userData.level === 'Admin' &&
        AdminLinkItems.map(link => (
          <Box onClick={link.onClick}>
            <NavItem key={link.name} icon={link.icon} navUrl={link.href} subMenu={link.subMenu} isOpen={link.isOpen}>
              {link.name}
            </NavItem>
          </Box>
        ))}

      <Box onClick={handleLogout}>
        <NavItem icon={FiLogOut} navUrl="/dsaa">
          Logout
        </NavItem>
      </Box>
    </Box>
  );
};

export default SidebarContent;
