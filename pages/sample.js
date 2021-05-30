import { Flex, Container, Box } from '@chakra-ui/react';

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

import Layout from 'components/template/Layout';

const page = () => {
  return (
    <Layout>
      <Box position="relative">
        <Slideshow />
      </Box>
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
    </Layout>
  );
};
export default page;
