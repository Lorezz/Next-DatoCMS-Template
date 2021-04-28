import React, { useContext } from 'react';
import Link from 'next/link';
import {
  Box,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
  useColorMode
} from '@chakra-ui/react';
import {
  MdMoreVert,
  MdChat,
  MdAccountBox,
  MdHome,
  MdExitToApp,
  MdClose
} from 'react-icons/md';

import ColorMode from './ColorMode';
import { getGravatarUrl } from 'lib/gravatar';
import { StateContext } from 'lib/ctx';

const NavBar = () => {
  const [machine, sendToMachine] = useContext(StateContext);
  const { user } = machine.context;
  const isSM = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  const logout = () => {
    console.log('send logout state');
    sendToMachine('LOGOUT');
  };

  return (
    <Box
      d="flex"
      justifyContent="space-between"
      boxShadow="base"
      p="1"
      zIndex={2}>
      <Box d="flex" alignItems="center">
        <Link href="/">
          <a>
            <Box
              as="img"
              loading="lazy"
              title="NextFlag"
              src={
                colorMode === 'light'
                  ? '/images/logo-inverted.png'
                  : '/images/logo.png'
              }
              height={[10, 50]}
              mx={2}
            />
          </a>
        </Link>
      </Box>
      <Box d="flex" alignItems="center">
        <ColorMode />
      </Box>
      <Box d="flex" alignItems="center" mx={4}>
        {user && (
          <>
            <Text margin="1" fontWeight="bold" hidden={isSM ? true : false}>
              {user.userName}
            </Text>
            <Avatar
              showBorder
              name={user.userName}
              src={
                user.avatarImage
                  ? user.avatarImage.url
                  : getGravatarUrl(user.email)
              }
            />
            <Menu>
              <MenuButton>
                <MdMoreVert size={24} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<MdExitToApp size={24} />}
                  onClick={() => logout()}>
                  Logout
                </MenuItem>
                <MenuItem icon={<MdHome size={24} />}>Home</MenuItem>
                <MenuItem icon={<MdChat size={24} />}>POST</MenuItem>
                <MenuItem icon={<MdAccountBox size={24} />}>USERS</MenuItem>
                <MenuDivider />
                <MenuItem icon={<MdClose size={24} />}>close</MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
