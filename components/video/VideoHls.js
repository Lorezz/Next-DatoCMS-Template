import { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Hls from 'hls.js';

export default function VideoPlayer({ src, autoplay = true, ...other }) {
  const ref = useRef();

  useEffect(() => {
    var hls = new Hls();
    hls.attachMedia(ref.current);

    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(src);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        if (autoplay) {
          ref.current.play();
        }
      });
    });
  }, []);

  return (
    <Box
      d="flex"
      w="100%"
      minHeight={300}
      justifyContent="center"
      alignItems="center">
      <video ref={ref} style={{ width: '100%' }} {...other} />
    </Box>
  );
  //<video {...other} ref={ref} />;
}
