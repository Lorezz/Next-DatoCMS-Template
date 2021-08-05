import dynamic from 'next/dynamic'
import { Container, Box } from '@chakra-ui/react';


import Cta from 'components/samples/Cta';
import Post from 'components/samples/Post';
import Newsletter from 'components/samples/Newsletter';
import Layout from 'components/samples/Layout';

const MapLeaf =  dynamic(() => import("components/maps/MapMix"), {ssr: false});
const MapBox =  dynamic(() => import("components/maps/MapMapbox"), {ssr: false});


//const MapWithNoSSR = dynamic(() => import("components/maps/MapLeaflet"), {ssr: false});
  const position = [42.97960654540092, 10.686549498402442]
 const positionBox = {lat:42.97960654540092, lng:10.686549498402442, zoom:15 }

const page = () => {
  return (
    <Layout>
      <Container maxW={'7xl'} p="12">
        <Post />
        <Cta />
         <Box  bg="green.200" h="500px">
          <MapBox name="RioTorto" position={positionBox} mapHeight={500}/>
        </Box>
        <Box  bg="blue.200"   h="500px" m={13} posiont="relative">
          <MapLeaf name="RioTorto" position={position}/>
        </Box>
        <Newsletter />
      </Container>
    </Layout>
  );
};
export default page;
