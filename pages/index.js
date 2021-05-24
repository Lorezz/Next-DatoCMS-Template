import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  renderMetaTags,
  Image,
  StructuredText,
  renderRule
} from 'react-datocms';
import { isBlockquote, isCode, isHeading } from 'datocms-structured-text-utils';
import { render as toPlainText } from 'datocms-structured-text-to-plain-text';

import { Heading } from '@chakra-ui/react';

import Layout from 'components/Layout';
import CodeHilight from 'components/CodeHilight';
// import Header from 'components/Header';
// import ProductsSlider from 'components/ProductsSlider';

// import { getMenuPaths, filterMenu } from 'utils/utils';
import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';
import { log } from 'xstate/lib/actions';

const BlogIndexPage = ({ data }) => {
  const renderGallery = (record) => {
    return (
      <div>
        {record.images.map((i) => (
          <Image key={i.id} data={i.responsiveImage} />
        ))}
      </div>
    );
  };

  const renderIntenalLink = (internalLink, title = null) => {
    console.log('====================================');
    console.log('internalLink', internalLink);
    console.log('====================================');
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

    return (
      <Link href={`${path}/${internalLink.slug}`}>
        <a>{linkTitle ? linkTitle : internalLink.slug}</a>
      </Link>
    );
  };

  const renderLinkBlock = (block) => {
    console.log('Link BLOCK', block);
    const { title, externalLinkUrl, internalLink } = block;
    if (externalLinkUrl) {
      return (
        <a href={externalLinkUrl} target="_blank">
          {title}
        </a>
      );
    } else if (internalLink) {
      return renderIntenalLink(internalLink, title);
    } else {
      return <div>empty</div>;
    }
  };

  const renderBlock = (record) => {
    console.log('block', record.__typename);
    switch (record.__typename) {
      case 'GalleryRecord':
        return <div>{renderGallery(record)}</div>;
      case 'LinkRecord':
        return <div>{renderLinkBlock(record)}</div>;
      default:
        return null;
    }
  };

  return (
    <div>
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
      <h1>{data.home.title}</h1>
      <StructuredText
        data={data.home.content}
        renderInlineRecord={({ record }) => {
          console.log('inline', record.__typename);
          return renderIntenalLink(record);
        }}
        renderLinkToRecord={({ record, children, transformedMeta }) => {
          console.log('link', record.__typename);
          switch (record.__typename) {
            case 'PostRecord':
              return (
                <a {...transformedMeta} href={`/blog/${record.slug}`}>
                  {children}
                </a>
              );
            case 'PageRecord':
              return (
                <a {...transformedMeta} href={`/${record.slug}`}>
                  {children}
                </a>
              );
            default:
              return null;
          }
        }}
        renderBlock={({ record }) => renderBlock(record)}
        customRules={[
          renderRule(isBlockquote, ({ node, children, key }) => {
            return (
              <div key={key}>
                <div>{children}</div>
                {node.attribution && <div>{node.attribution}</div>}
              </div>
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
              <Heading key={key} as={`h${node.level}`}>
                {children}
              </Heading>
            );
          })
        ]}
      />
    </div>
  );
};

export async function getStaticProps({ params }) {
  console.log('CURRENT PARAMS', params);

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
