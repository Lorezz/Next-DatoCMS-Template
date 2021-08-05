import dynamic from 'next/dynamic'
import { Container, Box } from '@chakra-ui/react';


 import Cta from 'components/samples/Cta';
import Post from 'components/samples/Post';
import Newsletter from 'components/samples/Newsletter';
import Gallery from 'components/samples/Gallery';
import Layout from 'components/samples/Layout';

const Map =  dynamic(() => import("components/maps/MapMapbox"), {ssr: false});

//const MapWithNoSSR = dynamic(() => import("components/maps/MapLeaflet"), {ssr: false});
//  const position = [42.97960654540092, 10.686549498402442]
const position = {lat:42.97960654540092, lng:10.686549498402442, zoom:15 }

const page = () => {
  return (
    <Layout>
      <Container maxW={'7xl'} p="12">
        <Post />
        <Gallery />
        <Cta />
        <Map name="RioTorto" position={position}/>
        <Newsletter />
      </Container>
    </Layout>
  );
};
export default page;
