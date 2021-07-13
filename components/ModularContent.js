import { Box, Heading, Text } from '@chakra-ui/react';

import LinkBlock from 'components/LinkBlock';
import CodeHilight from 'components/CodeHilight';
import BasicGallery from 'components/BasicGallery';
import Gallery from 'components/Gallery';
import VideoEmbedded from 'components/VideoEmbedded';
import VideoPlayer from 'components/VideoPlayer';
import BlockQuote from 'components/BlockQuote';
import HCta from 'components/HCta';
import VCta from 'components/VCta';
import Stats from 'components/Stats';
import Testimonials from 'components/Testimonials';
import TestimonialQuotes from 'components/TestimonialQuotes';
import Pricing from 'components/Pricing';
import FeatureBlock from 'components/FeatureBlock';
import TeamBlock from 'components/TeamBlock';
import WidgetBlock from 'components/WidgetBlock';

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
        return <VideoEmbedded {...record} />;
      case 'InternalVideoRecord':
        return <VideoPlayer {...record} />;
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
