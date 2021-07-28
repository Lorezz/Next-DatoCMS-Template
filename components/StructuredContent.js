import {
  Box,
  Heading,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
  Link
} from '@chakra-ui/react';
import { StructuredText, renderRule } from 'react-datocms';
import {
  isList,
  isListItem,
  isParagraph,
  isBlockquote,
  isCode,
  isHeading,
  isLink
} from 'datocms-structured-text-utils';

import BlockQuote from 'components/blocks/BlockQuote';
import CodeHilight from 'components/blocks/CodeHilight';
import LinkBlock from 'components/links/LinkBlock';
import InternalLink from 'components/links/InternalLink';
import BasicGallery from 'components/galleries/BasicGallery';
import Gallery from 'components/galleries/Gallery';
import VideoEmbedded from 'components/video/VideoEmbedded';
import VideoPlayer from 'components/video/VideoPlayer';
import HCta from 'components/cta/HCta';
import VCta from 'components/cta/VCta';

const StructuredContent = ({ content }) => {
  const renderBlock = (record) => {
    // console.log('block', record.__typename);
    switch (record.__typename) {
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
          // renderRule(isLink, ({ key,children, ...props }) => {
          //   console.log('props', props);
          //   return (
          //     <Link as="a" key={key} target="_blank" rel="noopener">
          //       {children}
          //     </Link>
          //   );
          // }),
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
            return (
              <Box key={key}>
                {node?.style === 'numbered' ? (
                  <OrderedList>{children}</OrderedList>
                ) : (
                  <UnorderedList>{children}</UnorderedList>
                )}
              </Box>
            );
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
