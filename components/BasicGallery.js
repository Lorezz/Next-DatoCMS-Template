import React from 'react';
import { SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { Image } from 'react-datocms';

const BasicGallery = ({ images }) => {
  const len = images?.length || 0;
  if (!len) {
    return null;
  }
  if (len === 1) {
    return <Image key={images[0].id} data={images[0].responsiveImage} />;
  }
  return (
    <SimpleGrid
      my={10}
      bg={useColorModeValue('gray.50', 'gray.700')}
      columns={{ sm: 1, md: 2, lg: 3 }}
      spacing="8"
      p="10"
      textAlign="center"
      rounded="lg">
      {images.map((i) => (
        <Image key={i.id} data={i.responsiveImage} />
      ))}
    </SimpleGrid>
  );
};
export default BasicGallery;
