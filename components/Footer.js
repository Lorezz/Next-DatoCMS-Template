import Link from 'next/link';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Flex,
  Input,
  IconButton,
  Image,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

const Logo = (props) => {
  return <Image src="/logo.png" {...props} />;
};

const SocialButton = ({ label, href }) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={'14'}
      h={'14'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target={'blank'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}>
      <SocialIcon name={label} />
    </Button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialIcon = ({ name }) => {
  if (name === 'Twitter') {
    return <FaTwitter />;
  } else if (name === 'Youtube') {
    return <FaYoutube />;
  } else if (name === 'Instagram') {
    return <FaInstagram />;
  } else {
    return <Text>{name}</Text>;
  }
};

const Column = ({ column }) => {
  const { id, title, pages } = column;
  return (
    <Stack align={'flex-start'}>
      <ListHeader>{title}</ListHeader>
      {pages?.filter(Boolean).map((page) => {
        return (
          <Link key={page.id || 'home'} href={page.slug ?? '/'}>
            <a>{page.title}</a>
          </Link>
        );
      })}
    </Stack>
  );
};

const Newsletter = () => {
  return (
    <Stack align={'flex-start'}>
      <ListHeader>Stay up to date</ListHeader>
      <Stack direction={'row'}>
        <Input
          placeholder={'Your email address'}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
          border={0}
          _focus={{
            bg: 'whiteAlpha.300'
          }}
        />
        <IconButton
          bg={useColorModeValue('green.400', 'green.800')}
          color={useColorModeValue('white', 'gray.800')}
          _hover={{
            bg: 'green.600'
          }}
          aria-label="Subscribe"
          onClick={() => console.log('click')}
          icon={<BiMailSend />}
        />
      </Stack>
    </Stack>
  );
};

const Footer = ({ data }) => {
  const { copy, showNewsletterForm, socials, columns } = data;
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} p={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={10}>
          <Flex d="flex" alignItems={'center'} w="full" flexDirection="column">
            <Logo
              // color={useColorModeValue('gray.700', 'white')}
              w={24}
            />
            <Text mt={5} fontSize={'sm'}>
              {copy ? copy : '-'}
            </Text>
          </Flex>
          {columns.filter(Boolean).map((c) => (
            <Column column={c} key={c.id ? c.id : c.title} />
          ))}
          <Stack>
            {showNewsletterForm && <Newsletter />}
            <Stack direction={'row'} spacing={6} my={10}>
              {socials.map(({ id, title, externalLinkUrl }) => (
                <SocialButton key={id} label={title} href={externalLinkUrl} />
              ))}
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
export default Footer;
