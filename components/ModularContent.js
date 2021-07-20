import { Box, Heading, Text } from '@chakra-ui/react';

import BasicGallery from 'components/galleries/BasicGallery';
import Gallery from 'components/galleries/Gallery';
import VideoEmbedded from 'components/video/VideoEmbedded';
import VideoPlayer from 'components/video/VideoPlayer';
import HCta from 'components/cta/HCta';
import VCta from 'components/cta/VCta';
import Testimonials from 'components/testimonials/Testimonials';
import TestimonialQuotes from 'components/testimonials/TestimonialQuotes';
import LinkBlock from 'components/links/LinkBlock';
import Stats from 'components/blocks/StatsBlock';
import BlockQuote from 'components/blocks/BlockQuote';
import CodeHilight from 'components/blocks/CodeHilight';
import Pricing from 'components/blocks/PricingBlock';
import FeatureBlock from 'components/blocks/FeatureBlock';
import TeamBlock from 'components/blocks/TeamBlock';
import WidgetBlock from 'components/blocks/WidgetBlock';

const ModularContent = ({ content }) => {
  // console.log('content', content);

  const renderBlock = (record) => {
    // console.log('block', record.__typename);
    switch (record.__typename) {
      case 'FeatureBlockRecord':
        return (
          <Box key={record.id}>
            <FeatureBlock {...record} />
          </Box>
        );
      case 'PricingBlockRecord':
        return (
          <Box key={record.id}>
            <Pricing {...record} />
          </Box>
        );
      case 'StatsBlockRecord':
        return (
          <Box py={4} key={record.id}>
            <Stats {...record} />
          </Box>
        );
      case 'TeamBlockRecord':
        return (
          <Box key={record.id}>
            <TeamBlock {...record} />
          </Box>
        );
      case 'TestimonialsBlockRecord':
        return (
          <Box key={record.id}>
            {record?.layout === 'inboxed' ? (
              <Testimonials {...record} />
            ) : (
              <TestimonialQuotes {...record} />
            )}
          </Box>
        );
      case 'WidgetBlockRecord':
        return (
          <Box key={record.id}>
            <WidgetBlock {...record} />
          </Box>
        );

      case 'ParagraphRecord':
        return (
          <Text py={4} key={record.id}>
            {record.text}
          </Text>
        );
      case 'PageSectionRecord':
        return (
          <Heading key={record.id} as={`h${record.level}`} pt={10}>
            {record.title}
          </Heading>
        );

      case 'CodeHighlightRecord':
        return (
          <Box py={4} key={record.id}>
            <CodeHilight
              code={record.code}
              language={record.language || 'js'}
              plugins={['line-numbers']}
            />
          </Box>
        );

      case 'GalleryRecord':
        return (
          <Box key={record.id}>
            {record?.layout === 'motion' ? (
              <Gallery images={record.images} />
            ) : (
              <BasicGallery images={record.images} />
            )}
          </Box>
        );
      case 'LinkRecord':
        return (
          <Box key={record.id}>
            <LinkBlock block={record} />
          </Box>
        );
      case 'CtaRecord':
        return (
          <Box key={record.id}>
            {record?.layout === 'vertical' ? (
              <VCta cta={record} />
            ) : (
              <HCta cta={record} />
            )}
          </Box>
        );
      case 'EmbeddedVideoRecord':
        return (
          <Box key={record.id} py={10}>
            <VideoEmbedded {...record} />
          </Box>
        );
      case 'InternalVideoRecord':
        return (
          <Box key={record.id} py={10}>
            <VideoPlayer {...record} />
          </Box>
        );
      case 'QuoteRecord':
        return (
          <BlockQuote
            key={record.id}
            node={{ attribution: record.attribution }}>
            {record.text}
          </BlockQuote>
        );

      default:
        return null;
    }
  };

  return <Box>{content.map((block) => renderBlock(block))}</Box>;
};

export default ModularContent;
