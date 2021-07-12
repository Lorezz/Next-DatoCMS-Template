import { Box, Heading, Text } from '@chakra-ui/react';

import LinkBlock from 'components/LinkBlock';
import CodeHilight from 'components/CodeHilight';
import BasicGallery from 'components/BasicGallery';
import VideoEmbedded from 'components/VideoEmbedded';
import VideoPlayer from 'components/VideoPlayer';
import BlockQuote from 'components/BlockQuote';

const ModularContent = ({ content }) => {
  console.log('content', content);

  const renderBlock = (record) => {
    // console.log('block', record.__typename);
    switch (record.__typename) {
      case 'FeatureBlockRecord':
        return (
          <Text py={4} key={record.id}>
            {record.title}
          </Text>
        );
      case 'PricingBlockRecord':
        return (
          <Text py={4} key={record.id}>
            {record.title}
          </Text>
        );
      case 'StatsBlockRecord':
        return (
          <Text py={4} key={record.id}>
            {record.title}
          </Text>
        );
      case 'TeamBlockRecord':
        return (
          <Text py={4} key={record.id}>
            {record.title}
          </Text>
        );
      case 'TestimonialsBlockRecord':
        return (
          <Text py={4} key={record.id}>
            {record.title}
          </Text>
        );
      case 'WidgetBlockRecord':
        return (
          <Text py={4} key={record.id}>
            {record.title}
          </Text>
        );

      case 'ParagraphRecord':
        return (
          <Text py={4} key={record.id}>
            {record.text}
          </Text>
        );
      case 'PageSectionRecord':
        return (
          <Heading key={record.id} as={`h${record.level}`} py={5}>
            {record.title}
          </Heading>
        );

      case 'CodeHighlightRecord':
        return (
          <CodeHilight
            key={record.id}
            code={record.code}
            language={record.language || 'js'}
            plugins={['line-numbers']}
          />
        );

      case 'GalleryRecord':
        return (
          <Box key={record.id}>
            <BasicGallery images={record.images} />
          </Box>
        );
      case 'LinkRecord':
        return (
          <Box key={record.id}>
            <LinkBlock block={record} />
          </Box>
        );
      case 'CtaRecord':
        return <Box key={record.id}>{'CTA'}</Box>;
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
