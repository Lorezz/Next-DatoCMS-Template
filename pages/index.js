import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  SimpleGrid,
  Text,
  Avatar,
  OrderedList,
  UnorderedList,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react';
import {
  renderMetaTags,
  Image,
  StructuredText,
  renderRule
} from 'react-datocms';
import {
  isList,
  isListItem,
  isParagraph,
  isBlockquote,
  isCode,
  isHeading
} from 'datocms-structured-text-utils';
import { render as toPlainText } from 'datocms-structured-text-to-plain-text';

import Layout from 'components/template/Layout';
import CodeHilight from 'components/CodeHilight';
import Slideshow from 'components/Slideshow';
// import Header from 'components/Header';
// import ProductsSlider from 'components/ProductsSlider';

// import { getMenuPaths, filterMenu } from 'utils/utils';
import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';

const BlogIndexPage = ({ data }) => {
  const renderGallery = (record) => {
    const len = record.images?.length || 0;
    if (!len) return;
    if (len === 1) {
      return (
        <Image
          key={record.images[0].id}
          data={record.images[0].responsiveImage}
        />
      );
    }
    return (
      <SimpleGrid
        key={record.id}
        my={10}
        bg={useColorModeValue('gray.50', 'gray.700')}
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing="8"
        p="10"
        textAlign="center"
        rounded="lg">
        {record.images.map((i) => (
          <Image key={i.id} data={i.responsiveImage} />
        ))}
      </SimpleGrid>
    );
  };

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
        return <Box key={record.id}>{renderGallery(record)}</Box>;
      case 'LinkRecord':
        return <Box key={record.id}>{renderLinkBlock(record)}</Box>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      {data?.home?.seo && (
        <Head>
          {renderMetaTags(data.home.seo)}
          {/* {post._firstPublishedAt && (
            <meta
              property="article:published_time"
              content={new Date(post._firstPublishedAt).toISOString()}
            />
          )} */}
        </Head>
      )}
      {data.home.slideshow?.slides && (
        <Slideshow slides={data.home.slideshow.slides} />
      )}
      <Container maxW={'container.xl'} px={4} py={5}>
        <Heading as="h1" fontSize="6xl" py={10}>
          {data.home.title}
        </Heading>
        <StructuredText
          data={data.home.content}
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
              return (
                <Box key={key}>
                  <Box>{children}</Box>
                  {node.attribution && <Box>{node.attribution}</Box>}
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
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  // console.log('CURRENT PARAMS', params);

  const response = await doQuery(queries.home, null);
  const { data } = response;
  // const paths = getMenuPaths(data);

  // let v = { locale };
  // let payload = { ...params };
  // const r = await doQuery(queries.homeQuery, v);
  // payload.data = r.data;

  // const site = await doQuery(queries.siteQuery);
  // const footer = await doQuery(queries.footerQuery, { locale });
  // const navPages = filterMenu(paths, locale);

  // return {
  //   props: { site, footer, ...payload, paths, navPages, locale }
  // };

  return {
    props: { data }
  };
}

export default BlogIndexPage;
