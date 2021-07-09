import { useState } from 'react';
import {
  SimpleGrid,
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { Image } from 'react-datocms';

const BasicGallery = ({ images }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const len = images?.length || 0;
  if (!len) {
    return null;
  }
  const toggleImage = (image = null) => {
    setSelected(image);
    isOpen ? onClose() : onOpen();
  };

  return (
    <>
      {len === 1 ? (
        <Box
          onClick={() => toggleImage(images[0])}
          transform="scale(0.95)"
          transition="0.3s ease-in-out"
          _hover={{
            transform: 'scale(1)'
          }}>
          <Image key={images[0].id} data={images[0].responsiveImage} />
        </Box>
      ) : (
        <SimpleGrid
          my={10}
          bg={useColorModeValue('gray.50', 'gray.700')}
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing="8"
          p="10"
          textAlign="center"
          rounded="lg">
          {images.map((i) => (
            <Box
              onClick={() => toggleImage(i)}
              transform="scale(1.0)"
              transition="0.3s ease-in-out"
              _hover={{
                transform: 'scale(1.05)'
              }}>
              <Image key={i.id} data={i.responsiveImage} />
            </Box>
          ))}
        </SimpleGrid>
      )}
      <Modal
        size={'full'}
        isOpen={isOpen}
        onClose={onClose}
        allowPinchZoom={true}
        isCentered
        scrollBehavior={'inside'}
        blockScrollOnMount={true}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalCloseButton color="white" bg="red.400" />
          <ModalBody p={20}>
            <Flex
              alignItems="center"
              justifyContent="center"
              onClick={() => toggleImage()}>
              {selected && (
                <Box>
                  click to close
                  <Image key={selected?.id} data={selected?.responsiveImage} />
                  <Box>
                    {selected.title && <Text>title: {selected.title} </Text>}
                    {selected.alt && <Text>alt: {selected.alt} </Text>}
                    {selected.copyright && (
                      <Text>copy: {selected.copyright} </Text>
                    )}
                    {selected.author && <Text>author: {selected.author} </Text>}
                  </Box>
                </Box>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default BasicGallery;
