import { Container, Box } from '@chakra-ui/react';

import Hero from 'components/template/HeroCta';
import Stats from 'components/template/Stats';
import FeatureBlock from 'components/template/FeatureBlock';
import FeaturedPost from 'components/template/FeaturedPost';
import FeatureContent from 'components/template/FeatureContent';
import Testimonials from 'components/template/Testimonials';
import TestimonialQuotes from 'components/template/FeatureList';
import Pricing from 'components/template/Pricing';
import Newsletter from 'components/template/Newsletter';

import PostGrid from 'components/template/PostGrid';
import ProductGrid from 'components/template/ProductGrid';
import TeamBlock from 'components/template/ProfileGrid';

import Carousel from 'components/template/Carousel';
import Gallery from 'components/template/Gallery';

import Layout from 'components/template/Layout';

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
