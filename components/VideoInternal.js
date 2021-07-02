import { Box } from '@chakra-ui/react';

const VideoInternal = ({ id, videoFile, ...other }) => {
  return (
    <Box
      d="flex"
      w="100%"
      minHeight={300}
      justifyContent="center"
      alignItems="center"
      key={id}>
      <video {...other} style={{ width: '100%' }}>
        <source src={videoFile.url} type={videoFile.mimeType} />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </Box>
  );
};

export default VideoInternal;
