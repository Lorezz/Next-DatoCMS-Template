import { useState, useRef } from 'react';
import Swiper from 'react-id-swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import { Box, Text } from '@chakra-ui/react';
import { Image } from 'react-datocms';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const SwiperCarousel = ({ slides = fake }) => {
  const ref = useRef(null);
  const [swiper, setSwiper] = useState(null);

  const params = {
    speed: 1000,
    loop: true,
    // slidesPerView: 1,
    autoplay: {
      delay: 9000
    }
  };

  SwiperCore.use([Autoplay]);
  return (
    <Box
      className="swiper-container"
      position="relative"
      display="flex"
      flexDirection="column"
      mt={{ base: '0', md: '2vh' }}
      w={{ base: '100vw', md: '95vw', lg: '90vw', xl: '80vw' }}
      h={{ base: '95vh', md: '90vh' }}
      alignItems="center">
      <Swiper getSwiper={setSwiper} {...params} ref={ref}>
        {slides.map(({ id: slideID, title, image }) => {
          const { id, url, copyright, author } = image;
          return (
            <Box
              className="swiper-slide"
              key={`slide_${slideID}`}
              backgroundImage={`url(${url})`}
              backgroundSize="cover"
              backgroundPosition="center center"
              display="flex"
              w="full"
              h={{ base: '95vh', md: '90vh' }}
              position="relative"
              alignItems="center">
              <Box
                bgGradient="linear(to-r, rgba(0,0,0,0.3), rgba(0,0,0,0.1))"
                display="flex"
                h={{ base: '95vh', md: '90vh' }}
                flex="1"
                alignItems={{ base: 'flex-start', md: 'center' }}
                padding={{ base: '0', sm: '5vmin', md: '10vmin' }}>
                <Box
                  color="white"
                  bgGradient="linear(to-t, rgba(0,0,0,0.2), rgba(0,0,0,0.1))"
                  bg="rgba(0,0,0,0.5)"
                  boxShadow="dark-lg"
                  borderRadius="md"
                  px={10}
                  py={1}>
                  <Text
                    // textShadow="1px 1px #2b2b2b"
                    // bgGradient="linear(to-l, #7928CA, #FF0080)"
                    // bgClip="text"
                    fontSize={{ base: '2xl', sm: '3xl', md: '6xl' }}
                    fontWeight="light">
                    {title}
                  </Text>
                  {(copyright || author) && (
                    <Text
                      fontSize={{
                        base: 'lg',
                        sm: 'xl',
                        md: '2xl'
                      }}>{` ${copyright} ${author}`}</Text>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Swiper>
      <Box
        position="absolute"
        w="100%"
        bottom="5vh"
        display="flex"
        justifyContent="space-between"
        zIndex={2}>
        <Box
          color="white"
          bg="black"
          borderRadius="lg"
          borderColor="white"
          borderWidth={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={4}
          margin={10}
          onClick={() => ref?.current?.swiper?.slidePrev()}>
          <ArrowLeftIcon />
        </Box>
        <Box
          color="white"
          bg="black"
          borderRadius="lg"
          borderColor="white"
          borderWidth={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin={10}
          px={5}
          py={4}
          onClick={() => ref?.current?.swiper?.slideNext()}>
          <ArrowRightIcon color="white" />
        </Box>
      </Box>
    </Box>
  );
};

export default SwiperCarousel;
