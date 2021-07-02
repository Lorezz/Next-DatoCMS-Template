import {
  Box,
  Heading,
  Text,
  OrderedList,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { StructuredText, renderRule } from 'react-datocms';
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

const StructuredContent = ({ content }) => {
  const renderBlock = (record) => {
    // console.log('block', record.__typename);
    switch (record.__typename) {
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
      default:
        return null;
    }
  };

  return (
    <Box>
      <StructuredText
        data={content}
        renderInlineRecord={({ record }) => {
          // console.log('inline', record.__typename);
          return <InternalLink {...record} />;
        }}
        renderLinkToRecord={({ record, children, transformedMeta }) => {
          // console.log('link', record.__typename);
          switch (record.__typename) {
            case 'PostRecord':
              return (
                <a
                  {...transformedMeta}
                  href={`/blog/${record.slug}`}
                  key={record.id}>
                  {children}
                </a>
              );
            case 'TagRecord':
              return (
                <a
                  {...transformedMeta}
                  href={`/tag/${record.slug}`}
                  key={record.id}>
                  {children}
                </a>
              );
            case 'PageRecord':
              return (
                <a
                  {...transformedMeta}
                  href={`/${record.slug}`}
                  key={record.id}>
                  {children}
                </a>
              );
            default:
              return null;
          }
        }}
        renderBlock={({ record }) => renderBlock(record)}
        customRules={[
          renderRule(isParagraph, ({ children, key }) => {
            return (
              <Text py={4} key={key}>
                {children}
              </Text>
            );
          }),
          renderRule(isBlockquote, ({ node, children, key }) => {
            const props = { node, children, key };
            return <BlockQuote {...props} />;
          }),
          renderRule(isCode, ({ node, key }) => {
            return (
              <CodeHilight
                key={key}
                code={node.code}
                language={node.language || 'js'}
                plugins={['line-numbers']}
              />
            );
          }),
          renderRule(isHeading, ({ node, children, key }) => {
            return (
              <Heading key={key} as={`h${node.level}`} py={5}>
                {children}
              </Heading>
            );
          }),
          renderRule(isList, ({ node, children, key }) => {
            <Box key={key}>
              {node?.style === 'numbered' ? (
                <OrderedList>{children}</OrderedList>
              ) : (
                <UnorderedList>{children}</UnorderedList>
              )}
            </Box>;
          }),
          renderRule(isListItem, ({ node, children, key }) => {
            return <ListItem key={key}>{children}</ListItem>;
          })
        ]}
      />
    </Box>
  );
};

export default StructuredContent;
