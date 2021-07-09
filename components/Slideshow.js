// Import Swiper React components
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

// Import Swiper styles
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);
import { Box, Text, Image } from '@chakra-ui/react';
import { Image as DatoImage } from 'react-datocms';

const SwiperCrousel = ({ slides }) => {
  return (
    <Box w={'100%'} maxH={'80vh'} position="relative" p={4}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map(({ title, image }) => {
          const { id, copyright, author } = image;
          return (
            <SwiperSlide key={id}>
              <Box w={'100%'} maxH={'80vh'} position="relative">
                <Box
                  right={0}
                  top={0}
                  position="absolute"
                  zIndex={100}
                  color="white"
                  bgGradient="linear(to-t, rgba(0,0,0,0.2), rgba(0,0,0,0.1))"
                  bg="rgba(0,0,0,0.7)"
                  px={10}
                  py={1}>
                  <Text
                    fontSize={{ base: 'lg', sm: 'xl', md: '3xl' }}
                    fontWeight="extrabold">
                    {title}
                  </Text>
                  {(copyright || author) && (
                    <Text
                      fontSize={{
                        base: 'md',
                        sm: 'lg',
                        md: 'xl'
                      }}>{` ${copyright} ${author}`}</Text>
                  )}
                </Box>
                <DatoImage data={image.responsiveImage} />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};
export default SwiperCrousel;
