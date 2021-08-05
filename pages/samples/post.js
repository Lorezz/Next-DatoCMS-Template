import dynamic from 'next/dynamic'
import { Container, Box , Text} from '@chakra-ui/react';


import Cta from 'components/samples/Cta';
import Post from 'components/samples/Post';
import Newsletter from 'components/samples/Newsletter';
import Layout from 'components/samples/Layout';

const MapLeaf =  dynamic(() => import("components/maps/MapLeaflet"), {ssr: false});
const MapBox =  dynamic(() => import("components/maps/MapMapbox"), {ssr: false});
const MapMix =  dynamic(() => import("components/maps/MapMix"), {ssr: false});


//const MapWithNoSSR = dynamic(() => import("components/maps/MapLeaflet"), {ssr: false});
  const position = [42.97960654540092, 10.686549498402442]
 const positionBox = {lat:42.97960654540092, lng:10.686549498402442, zoom:14 }

const page = () => {
  return (
    <Layout>
      <Container maxW={'7xl'} p="12">
        <Post />
        <Cta />
        <Text>MapBox</Text>
        <Box h="500px" my={15} mb={5}>
          <MapBox name="RioTorto" position={positionBox} mapHeight={500}/>
        </Box>
        <Text>LeafLet</Text>
        <Box h="500px" my={15} mb={5}>
          <MapLeaf name="RioTorto" position={position}/>
        </Box>
        <Text>Mixed</Text>
        <Box h="500px" my={15} mb={5}>
          <MapMix name="RioTorto" position={position}/>
        </Box>
        <Newsletter />
      </Container>
    </Layout>
  );
};
export default page;
