import { useRef, useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import ReactPlayer from 'react-player';

const VideoEmbedded = ({ id, video, autoplay, loop }) => {
  const ref = useRef();
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (ref?.current && !width) {
      const rect = ref.current.getBoundingClientRect().toJSON();
      // console.log('RECT WIDTH', rect.width);
      setWidth(rect.width);
    }
    [ref?.current], width;
  });

  return (
    <Flex
      w="100%"
      ref={ref}
      minHeight={300}
      justifyContent="center"
      alignItems="center"
      key={id}>
      {width && (
        <ReactPlayer
          controls={true}
          muted={true}
          width={width}
          autoPlay={autoplay}
          loop={loop}
          url={video.url}
        />
      )}
    </Flex>
  );
};

export default VideoEmbedded;
