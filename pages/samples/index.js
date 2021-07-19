import { Container, Box } from '@chakra-ui/react';

import Hero from 'components/samples/HeroCta';
import Stats from 'components/samples/Stats';
import FeatureBlock from 'components/samples/FeatureBlock';
import FeaturedPost from 'components/samples/FeaturedPost';
import FeatureContent from 'components/samples/FeatureContent';
import Testimonials from 'components/samples/Testimonials';
import TestimonialQuotes from 'components/samples/FeatureList';
import Pricing from 'components/samples/Pricing';
import Newsletter from 'components/samples/Newsletter';

import PostGrid from 'components/samples/PostGrid';
import ProductGrid from 'components/samples/ProductGrid';
import TeamBlock from 'components/samples/ProfileGrid';

import Carousel from 'components/samples/Carousel';
import Gallery from 'components/samples/Gallery';

import Layout from 'components/samples/Layout';

const page = () => {
  return (
    <Layout>
      <Box position="relative">
        <Carousel />
      </Box>
      <Container maxW={'7xl'}>
        <Hero />
        <Gallery />
        <FeatureBlock />
        <FeaturedPost />
        <FeatureContent />
        <PostGrid />
        <ProductGrid />
        <TeamBlock />
        <Testimonials />
        <Stats />
        <TestimonialQuotes />
        <Pricing />
        <Newsletter />
      </Container>
    </Layout>
  );
};
export default page;
