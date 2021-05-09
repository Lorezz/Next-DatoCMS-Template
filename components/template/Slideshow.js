import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { Box, Flex } from '@chakra-ui/react';

const images = [
  'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
  'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
  'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png'
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Slideshow = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     paginate(1);
  //   }, 3000);
  // }, [page, images]);

  return (
    <Flex
      width="100%"
      height="50vh"
      style={{ position: 'relative' }}

      // justify-content: center;
      // align-items: center
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          style={{
            position: 'absolute',
            maxWidth: '100%'
          }}
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <Box
        style={{
          top: 'calc(50% - 20px)',
          position: 'absolute',
          background: 'white',
          borderRadius: '30px',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '18px',
          zIndex: 2,

          left: '10px',
          transform: 'scale(-1)'
        }}
        onClick={() => paginate(-1)}>
        {'‣'}
      </Box>
      <Box
        style={{
          top: 'calc(50% - 20px)',
          position: 'absolute',
          background: 'white',
          borderRadius: '30px',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '18px',
          zIndex: 2,

          right: '10px'
        }}
        onClick={() => paginate(1)}>
        {'‣'}
      </Box>
    </Flex>
  );
};

export default Slideshow;
