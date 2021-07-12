import { useState } from 'react';
import {
  Heading,
  Box,
  Image,
  Text,
  Wrap,
  WrapItem,
  useMediaQuery,
  useColorModeValue
} from '@chakra-ui/react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';

const MotionBox = motion(Box);
const ZINDEX = 10;

const items = [
  // Photo by ivan Torres on Unsplash
  {
    id: 'c',
    category: 'Pizza',
    title: '5 Food Apps Delivering the Best of Your City',
    pointOfInterest: 80,
    backgroundColor: '#814A0E'
  },
  // Photo by Dennis Brendel on Unsplash
  {
    id: 'f',
    category: 'How to',
    title: 'Arrange Your Apple Devices for the Gram',
    pointOfInterest: 120,
    backgroundColor: '#959684'
  },
  // Photo by Alessandra Caretto on Unsplash
  {
    id: 'a',
    category: 'Pedal Power',
    title: 'Map Apps for the Superior Mode of Transport',
    pointOfInterest: 260,
    backgroundColor: '#5DBCD2'
  },
  // Photo by Taneli Lahtinen on Unsplash
  {
    id: 'g',
    category: 'Holidays',
    title: 'Our Pick of Apps to Help You Escape From Apps',
    pointOfInterest: 200,
    backgroundColor: '#8F986D'
  },
  // Photo by Simone Hutsch on Unsplash
  {
    id: 'd',
    category: 'Photography',
    title: 'The Latest Ultra-Specific Photography Editing Apps',
    pointOfInterest: 150,
    backgroundColor: '#FA6779'
  },
  // Photo by Siora Photography on Unsplash
  {
    id: 'h',
    category: "They're all the same",
    title: '100 Cupcake Apps for the Cupcake Connoisseur',
    pointOfInterest: 60,
    backgroundColor: '#282F49'
  },
  // Photo by Yerlin Matu on Unsplash
  {
    id: 'e',
    category: 'Cats',
    title: 'Yes, They Are Sociopaths',
    pointOfInterest: 200,
    backgroundColor: '#AC7441'
  },
  // Photo by Ali Abdul Rahman on Unsplash
  {
    id: 'b',
    category: 'Holidays',
    title: 'Seriously the Only Escape is the Stratosphere',
    pointOfInterest: 260,
    backgroundColor: '#CC555B'
  }
];

function Card({ id, perc, title, category, theme, onSelect }) {
  return (
    <WrapItem
      className={` ${theme}`}
      p={0}
      width={perc}
      height={'460px'}
      onClick={() => onSelect(id)}>
      <MotionBox
        position={'relative'}
        boxShadow={'lg'}
        rounded={'lg'}
        position="relative"
        overflow={'hidden'}
        h={'100%'}
        w={'100%'}
        bg={useColorModeValue('gray.100', 'gray.600')}
        layoutId={`card-container-${id}`}>
        <MotionBox
          position="absolute"
          h={'100%'}
          w={'100%'}
          top={0}
          left={0}
          layoutId={`card-image-container-${id}`}
          backgroundImage={`url(images/${id}.jpg)`}
          backgroundSize="cover"
        />
        <MotionBox
          position="absolute"
          top="15px"
          left="15px"
          layoutId={`title-container-${id}`}>
          <Text
            size="xs"
            fontWeight="bold"
            textTransform={'uppercase'}
            color="gray.300">
            {category}
          </Text>
          <Heading as="h3" size="md" color="white">
            {title}
          </Heading>
        </MotionBox>
      </MotionBox>
    </WrapItem>
  );
}

export function List({ selectedId, handleSelect }) {
  const [isLargerThan640] = useMediaQuery('(min-width:640px)');
  const selectCard = (id) => {
    console.log('card', id);
    handleSelect(id);
  };
  const size = items.length / 4 + (items.length % 4);
  const pattern = isLargerThan640
    ? ['60%', '35%', '35%', '60%']
    : ['90%', '90%', '90%', '90%'];
  const dimensions = Array(size).fill(pattern).flat();
  return (
    <Wrap spacing="20px" justify="center">
      {items.map((card, index) => (
        <Card
          key={card.id}
          {...card}
          perc={dimensions[index]}
          isSelected={card.id === selectedId}
          onSelect={selectCard}
        />
      ))}
    </Wrap>
  );
}

export function Item({ id, onClose }) {
  const { category, title } = items.find((item) => item.id === id);
  const [isLargerThan640] = useMediaQuery('(min-width:640px)');
  return (
    <MotionBox
      onClick={() => onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      transition={{ duration: 0.1, delay: 0 }}
      style={{ pointerEvents: 'auto' }}
      position="fixed"
      top={0}
      left={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('rgba(255,255,255,0.7)', 'rgba(0,0,0,0.7)')}
      willChange="opacity"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding={isLargerThan640 ? '20vh 20vw' : '30vh 1vw'}
      zIndex={ZINDEX}>
      <MotionBox
        position={'relative'}
        boxShadow={'2xl'}
        rounded={'xl'}
        overflow={'hidden'}
        position="relative"
        height="100%"
        width="100%"
        bg={useColorModeValue('gray.100', 'gray.700')}
        layoutId={`card-container-${id}`}>
        <MotionBox
          zIndex={ZINDEX + 1}
          height="100%"
          width="100%"
          position="absolute"
          overflow="hidden"
          layoutId={`card-image-container-${id}`}
          backgroundImage={`url(images/${id}.jpg)`}
          backgroundSize="cover"
        />
        <MotionBox
          position="absolute"
          top="30px"
          left="30px"
          zIndex={ZINDEX + 1}
          layoutId={`title-container-${id}`}>
          <Text fontWeight="bold" color="gray.300" textTransform={'uppercase'}>
            {category}
          </Text>
          <Heading as="h3" size="xl" color="white">
            {title}
          </Heading>
        </MotionBox>
      </MotionBox>
    </MotionBox>
  );
}

function Gallery() {
  const [id, setId] = useState(null);

  return (
    <AnimateSharedLayout type="crossfade">
      <List selectedId={id} handleSelect={(selectedId) => setId(selectedId)} />
      <AnimatePresence>
        {id && <Item id={id} key="item" onClose={() => setId(null)} />}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default Gallery;
