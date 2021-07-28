import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Image,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';

import ColorMode from 'components/layout/ColorMode';
import { resolvePage } from 'lib/utils';

const NavAction = ({ action }) => {
  const url = action.externalLinkUrl
    ? action.externalLinkUrl
    : action.internalLink?.slug;

  return (
    <NextLink href={url} passHref={true}>
      <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'gray.700'}
          _hover={{
            bg: 'gray.800'
          }}>
          {action.title}
        </Button>
      </Link>
    </NextLink>
  );
};
const hasChilds = (navItem) => {
  return navItem?.children && navItem.children.length > 0;
};

const DesktopNav = ({ nav }) => {
  const router = useRouter();
  const pushRoute = (path) => {
    if (path) return router.push(path);
  };
  return (
    <Stack direction={'row'} spacing={4} align={'center'}>
      {nav.map((navItem) => {
        return (
          <Box key={navItem.id}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box outline="none">
                  <NextLink href={resolvePage(navItem.href)} passHref>
                    <Link
                      mt={10}
                      p={2}
                      fontSize={'sm'}
                      fontWeight={500}
                      color={useColorModeValue('gray.600', 'gray.200')}
                      _hover={{
                        textDecoration: 'none',
                        color: useColorModeValue('gray.800', 'white')
                      }}>
                      {navItem.label}
                    </Link>
                  </NextLink>
                </Box>
              </PopoverTrigger>

              {hasChilds(navItem) && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={useColorModeValue('white', 'gray.900')}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href = '#', subLabel = '' }) => {
  return (
    <NextLink href={resolvePage(href)} passHref>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('gray.50', 'gray.800') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{
                color: useColorModeValue('purple.400', 'green.200')
              }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon
              color={useColorModeValue('purple.400', 'green.200')}
              w={5}
              h={5}
              as={ChevronRightIcon}
            />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};

const MobileNav = ({ nav }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {nav.map((navItem) => (
        <MobileNavItem key={navItem.id} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  const childs = hasChilds({ children });
  const handleClick = (hasChildren) => {
    if (hasChildren) {
      onToggle();
    }
    return;
  };
  return (
    <Stack spacing={4} onClick={(e) => handleClick(childs)}>
      <Flex
        py={2}
        as={Link}
        href={resolvePage(href)}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {childs && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {childs &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const Logo = (props) => {
  return <Image src="/logo.png" {...props} />;
};

const Header = ({ data }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { nav, actions, showThemeSwitch } = data;
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 12 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'black')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NextLink href="/">
            <a>
              {/* <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}>
                Logo
              </Text> */}
              <Logo height={'50px'} borderRadius="xl" />
            </a>
          </NextLink>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav nav={nav} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          align={'center'}
          direction={'row'}
          spacing={6}>
          {showThemeSwitch && <ColorMode />}
          {actions?.map((a) => (
            <NavAction key={a.id} action={a} />
          ))}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav nav={nav} />
      </Collapse>
    </Box>
  );
};

export default Header;
