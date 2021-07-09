import { Box, Container, Image } from '@chakra-ui/react';
import { Image as ProgressiveImage } from 'react-datocms';

const HeroImage = ({ pic, small = false }) => {
  return (
    <Container
      maxW={{ base: '100vw', md: '95vw', lg: '90vw', xl: '80vw' }}
      px={4}
      py={5}>
      {small ? (
        <Box d="flex" alignItems="center" justifyContent="center">
          <Image src={pic.url} />
        </Box>
      ) : (
        <Box maxW={{ base: '100vw', md: '95vw', lg: '90vw', xl: '80vw' }}>
          <ProgressiveImage data={pic.responsiveImage} />
        </Box>
      )}
    </Container>
  );
};

export default HeroImage;
