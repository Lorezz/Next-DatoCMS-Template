import { useState } from 'react';
import {
  Heading,
  Box,
  Text,
  Wrap,
  WrapItem,
  useMediaQuery,
  useColorModeValue
} from '@chakra-ui/react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';

const MotionBox = motion(Box);
const ZINDEX = 10;
const colors = {
  light: 'purple.400',
  light_bg: 'purple.500',
  dark: 'green.200',
  dark_bg: 'green.300'
};
function Card({ id, perc, title, url, alt: category, theme = '', onSelect }) {
  const color = useColorModeValue(colors.light, colors.dark);
  const bg = useColorModeValue('gray.100', 'gray.900');
  const colorScheme = useColorModeValue('purple', 'green');
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
        bg={bg}
        layoutId={`card-container-${id}`}>
        <MotionBox
          position="absolute"
          h={'100%'}
          w={'100%'}
          top={0}
          left={0}
          layoutId={`card-image-container-${id}`}
          backgroundImage={`url(${url})`}
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
            color={'white'}>
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

export function List({ selectedId, handleSelect, images }) {
  if (!images) return null;
  const [isLargerThan640] = useMediaQuery('(min-width:640px)');
  const selectCard = (id) => {
    handleSelect(id);
  };
  let size = Math.ceil(images.length / 4 + (images.length % 4));

  const pattern = isLargerThan640
    ? ['60%', '35%', '35%', '60%']
    : ['90%', '90%', '90%', '90%'];
  const dimensions = Array(size).fill(pattern).flat();
  return (
    <Wrap spacing="20px" justify="center">
      {images.map((card, index) => (
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

export function Item({ id, onClose, images }) {
  const img = images.find((item) => item.id === id);
  const { alt: category, title, url } = img;
  const [isLargerThan640] = useMediaQuery('(min-width:640px)');

  const overlay = useColorModeValue('rgba(255,255,255,0.7)', 'rgba(0,0,0,0.7)');
  const bg = useColorModeValue('gray.100', 'gray.600');
  const color = useColorModeValue(colors.light, colors.dark);
  const colorScheme = useColorModeValue('purple', 'green');
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
      bg={overlay}
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
        bg={bg}
        layoutId={`card-container-${id}`}>
        <MotionBox
          zIndex={ZINDEX + 1}
          height="100%"
          width="100%"
          position="absolute"
          overflow="hidden"
          layoutId={`card-image-container-${id}`}
          backgroundImage={`url(${url})`}
          backgroundSize="cover"
        />
        <MotionBox
          position="absolute"
          top="30px"
          left="30px"
          zIndex={ZINDEX + 1}
          layoutId={`title-container-${id}`}>
          <Text fontWeight="bold" color={'white'} textTransform={'uppercase'}>
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

function Gallery({ images }) {
  const [id, setId] = useState(null);

  if (!images || images.length === 0) return null;
  return (
    <AnimateSharedLayout type="crossfade">
      <List
        images={images}
        selectedId={id}
        handleSelect={(selectedId) => setId(selectedId)}
      />
      <AnimatePresence>
        {id && (
          <Item
            images={images}
            id={id}
            key="item"
            onClose={() => setId(null)}
          />
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default Gallery;
