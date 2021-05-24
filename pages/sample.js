import { Flex, Container } from '@chakra-ui/react';

import Header from 'components/template/Header';
import Footer from 'components/template/Footer';
import Hero from 'components/template/Hero';
import Stats from 'components/template/Stats';
import FeatureLine from 'components/template/FeatureLine';
import FeatureBlock from 'components/template/FeatureBlock';
import Testimonials from 'components/template/Testimonials';
import FeatureList from 'components/template/FeatureList';
import Pricing from 'components/template/Pricing';
import Newsletter from 'components/template/Newsletter';

import FeaturedPost from 'components/template/FeaturedPost';
import PostGrid from 'components/template/PostGrid';
import ProductGrid from 'components/template/ProductGrid';
import ProfileGrid from 'components/template/ProfileGrid';

import Slideshow from 'components/template/Slideshow';
import Gallery from 'components/template/Gallery';


const page = () => {
  return (
    <Flex
      minHeight="100vh"
      width="100vw"
      direction="column"
      overflow="hidden"
      justify="space-between">
      <Header />
      <Container maxW={'7xl'}>
        <Slideshow />
        <Hero />
        <Gallery />
        <FeatureLine />
        <FeaturedPost />
        <FeatureBlock />
        <PostGrid />
        <ProductGrid />
        <ProfileGrid />
        <Testimonials />
        <Stats />
        <FeatureList />
        <Pricing />
        <Newsletter />
      </Container>
      <Footer />
    </Flex>
  );
};
export default page;
