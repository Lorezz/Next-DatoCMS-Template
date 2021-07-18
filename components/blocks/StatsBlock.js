import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

function Stats({ id, title, stats }) {
  const resolveIconByName = (name) => {
    let icon = null;
    switch (name) {
      case 'user':
      case 'person':
        icon = <BsPerson size={'3em'} />;
        break;
      case 'server':
        icon = <FiServer size={'3em'} />;
        break;
      case 'location':
        icon = <GoLocation size={'3em'} />;
        break;
      default:
        break;
    }
    return icon;
  };

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}>
        {title}
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {stats.map((stat) => {
          const { id, value, icon = null, category = '' } = stat;

          return (
            <StatsCard
              key={id}
              title={category}
              stat={value}
              icon={icon ? resolveIconByName(icon) : null}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default Stats;
