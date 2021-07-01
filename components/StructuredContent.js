import React from 'react';
import Link from 'next/link';
import {
  Box,
  Heading,
  Text,
  Avatar,
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
import CodeHilight from 'components/CodeHilight';
import BasicGallery from 'components/BasicGallery';

const StructuredContent = ({ content }) => {
  const renderIntenalLink = (internalLink, title = null, preview = null) => {
    // console.log('internalLink', internalLink);
    let path = '';
    let linkTitle = title;
    switch (internalLink.__typename) {
      case 'PostRecord':
        path = '/blog';
        linkTitle = linkTitle || internalLink.title;
        break;
      case 'TagRecord':
        path = '/tags';
        linkTitle = linkTitle || internalLink.name;
        break;
      case 'AuthorRecord':
        path = '/authors';
        linkTitle = linkTitle || internalLink.name;
        break;
      case 'PageRecord':
        path = '';
        linkTitle = linkTitle || internalLink.title;
        break;
      default:
        break;
    }

    if (preview) {
      return (
        <Link
          href={`${path}/${internalLink.slug}`}
          key={internalLink.id}
          fontSize="xl">
          <a>
            <Box d="flex" px={4} alignItems="center" my={10}>
              {preview && <Avatar name={title} src={preview.url} mr={4} />}
              {linkTitle ? linkTitle : internalLink.slug}
            </Box>
          </a>
        </Link>
      );
    }
    return (
      <Link href={`${path}/${internalLink.slug}`} key={internalLink.id}>
        <a>{linkTitle ? linkTitle : internalLink.slug}</a>
      </Link>
    );
  };

  const renderLinkBlock = (block) => {
    console.log('Link BLOCK', block);
    const { title, externalLinkUrl, internalLink, preview } = block;
    if (externalLinkUrl) {
      return (
        <a href={externalLinkUrl} target="_blank" key={block.id}>
          {preview && <Avatar name={title} src={preview.url} />}
          {title}
        </a>
      );
    } else if (internalLink) {
      return renderIntenalLink(internalLink, title, preview);
    } else {
      return <Box>empty</Box>;
    }
  };

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
        return <Box key={record.id}>{renderLinkBlock(record)}</Box>;
      case 'CtaRecord':
        return <Box key={record.id}>{'CTA'}</Box>;
      case 'EmbeddedVideoRecord':
        return <Box key={record.id}>{'Video Embedded'}</Box>;
      case 'InternalVideoRecord':
        return <Box key={record.id}>{'Video Internal'}</Box>;
      default:
        return null;
    }
  };

  return (
    <StructuredText
      data={content}
      renderInlineRecord={({ record }) => {
        // console.log('inline', record.__typename);
        return renderIntenalLink(record);
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
              <a {...transformedMeta} href={`/${record.slug}`} key={record.id}>
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
          return (
            <Box key={key} borderLeftWidth={4} borderLeftColor="black">
              <Box px={5}>
                <Text as="i" fontWeight="light">
                  {children}
                </Text>
              </Box>
              {node.attribution && (
                <Box px={5}>
                  <Text fontWeight="bold">{`- ${node.attribution}`}</Text>
                </Box>
              )}
            </Box>
          );
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
  );
};

export default StructuredContent;
