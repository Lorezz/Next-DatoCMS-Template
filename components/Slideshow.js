import { useEffect, useState, useCallback, useRef } from 'react';
import Swiper from 'react-id-swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import { motion } from 'framer-motion';
import {
  Box,
  Heading,
  Link,
  Text,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  Container,
  VStack
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const SwiperCarousel = ({ slides = fake }) => {
  const ref = useRef(null);
  const [swiper, setSwiper] = useState(null);

  const params = {
    speed: 500,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 5000
    }
  };

  SwiperCore.use([Autoplay]);
  return (
    <Box style={{ position: 'relative' }}>
      <Swiper getSwiper={setSwiper} {...params} ref={ref}>
        {slides.map(({ id: slideID, title, image }) => {
          const { id, url, copyright, author } = image;
          return (
            <Box
              key={`slide_${slideID}`}
              backgroundImage={`url(${url})`}
              backgroundSize="cover"
              width="100%"
              height="100vh"
              display="flex"
              alignItems="center"
              // padding="10vmin"
            >
              <Box
                bgGradient="linear(to-r, rgba(0,0,0,0.3), rgba(0,0,0,0.1))"
                width="100%"
                height="100vh"
                display="flex"
                alignItems="center"
                padding="10vmin">
                <Box
                  color="white"
                  bgGradient="linear(to-t, rgba(0,0,0,0.2), rgba(0,0,0,0.1))"
                  bg="rgba(0,0,0,0.7)"
                  boxShadow="dark-lg"
                  borderRadius="md"
                  px={10}
                  py={1}>
                  <Text
                    // textShadow="1px 1px #2b2b2b"
                    // bgGradient="linear(to-l, #7928CA, #FF0080)"
                    // bgClip="text"
                    fontSize="6xl"
                    fontWeight="light">
                    {title}
                  </Text>
                  {(copyright || author) && (
                    <Text fontSize={'2xl'}>{` ${copyright} ${author}`}</Text>
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
