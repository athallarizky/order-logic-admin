/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Link, Flex, FlexProps, Icon, Box } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

/**
 * Nav Item
 */
interface NavItemProps extends FlexProps {
  icon: IconType;
  navUrl: string;
  children: string;
  subMenu?: string | null;
  isOpen?: undefined | boolean;
}
const NavItem = ({ icon, children, navUrl, subMenu, isOpen, ...rest }: NavItemProps) => {
  const router = useRouter();

  const renderSubMenu = type => {
    const assuranceSubMenuList = [
      { subMenuList: 'Rekap Gangguan Logic', href: '/trouble-report' },
      { subMenuList: 'Input Gangguan Logic', href: '/trouble-report/create' },
    ];

    const userManagementSubMenuList = [
      { subMenuList: 'List User', href: '/admin/user-management' },
      { subMenuList: 'Add User', href: '/admin/user-management/create' },
    ];

    const settingSubMenuList = [{ subMenuList: 'Change Password', href: '/setting/change-password' }];

    switch (type) {
      case 'assurance':
        if (isOpen) {
          return (
            <Box>
              {assuranceSubMenuList.map(menu => (
                <Link href={menu.href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                  <Flex
                    align="center"
                    p="4"
                    mx="4"
                    ml="10"
                    borderRadius="lg"
                    cursor="pointer"
                    background={router.pathname === menu.href ? '#7D110B' : ''}
                    _hover={{
                      bg: '#7D110B',
                      color: 'white',
                    }}
                  >
                    {menu.subMenuList}
                  </Flex>
                </Link>
              ))}
            </Box>
          );
        }
        return <></>;

      case 'user-management':
        if (isOpen) {
          return userManagementSubMenuList.map(menu => (
            <Link href={menu.href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Flex
                align="center"
                p="4"
                mx="4"
                ml="10"
                borderRadius="lg"
                cursor="pointer"
                background={router.pathname === menu.href ? '#7D110B' : ''}
                _hover={{
                  bg: '#7D110B',
                  color: 'white',
                }}
              >
                {menu.subMenuList}
              </Flex>
            </Link>
          ));
        }
        return <></>;

      case 'settings': {
        if (isOpen) {
          return settingSubMenuList.map(menu => (
            <Link href={menu.href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Flex
                align="center"
                p="4"
                mx="4"
                ml="10"
                borderRadius="lg"
                cursor="pointer"
                background={router.pathname === menu.href ? '#7D110B' : ''}
                _hover={{
                  bg: '#7D110B',
                  color: 'white',
                }}
              >
                {menu.subMenuList}
              </Flex>
            </Link>
          ));
        }
        return '';
      }

      default:
        return '';
    }
  };

  return (
    <Link href={navUrl} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        d="flex"
        justify="space-between"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        background={router.pathname === navUrl ? '#7D110B' : ''}
        _hover={{
          bg: '#7D110B',
          color: 'white',
        }}
        {...rest}
      >
        <Box>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Box>
        {subMenu && !isOpen && <FiChevronDown />}
        {subMenu && isOpen && <FiChevronUp />}
      </Flex>
      {subMenu && renderSubMenu(subMenu)}
    </Link>
  );
};

NavItem.defaultProps = {
  subMenu: null,
  isOpen: undefined,
};

export default NavItem;
