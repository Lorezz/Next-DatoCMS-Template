import {
  Box,
  Heading,
  Text,
  OrderedList,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import {
  isList,
  isListItem,
  isParagraph,
  isBlockquote,
  isCode,
  isHeading
} from 'datocms-structured-text-utils';
// import { render as toPlainText } from 'datocms-structured-text-to-plain-text';

import LinkBlock from 'components/LinkBlock';
import InternalLink from 'components/InternalLink';
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
