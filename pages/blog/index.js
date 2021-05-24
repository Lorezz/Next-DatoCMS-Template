import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { renderMetaTags, Image } from 'react-datocms';

import Layout from 'components/Layout';
// import Header from 'components/Header';
// import ProductsSlider from 'components/ProductsSlider';

// import { getMenuPaths, filterMenu } from 'utils/utils';
import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';

const BlogIndexPage = ({ data, footer, site, navPages, locale }) => {
  // function renderBlock(block, i) {
  //   return (
  //     <Link href={`/${locale}/${block.buttonUrl}`} key={i}>
  //       <a className="block__item">
  //         <Image data={block.image.responsiveImage} className="block__image" />
  //         <h3 className="block__title"> {block.title} </h3>
  //         <hr className="section__dash" />
  //         <div
  //           className="block__text formatted-content"
  //           dangerouslySetInnerHTML={{
  //             __html: block.text
  //           }}
  //         />
  //         <button className="button--red"> {block.buttonLabel} </button>
  //       </a>
  //     </Link>
  //   );
  // }

  // function renderCategory(category, i) {
  //   let buttonColor;
  //   if (i === 0) {
  //     buttonColor = '--primary';
  //   } else if (i === 1) {
  //     buttonColor = '--red';
  //   } else {
  //     buttonColor = '--aqua';
  //   }

  //   return (
  //     <div className="block__item" key={i}>
  //       <h3 className="block__title">{category.name}</h3>
  //       <p className="block__subtitle">{category.previewText}</p>
  //       <Image data={category.image.responsiveImage} className="block__image" />
  //       <Link href={`/`}>
  //         <a>home</a>
  //       </Link>
  //     </div>
  //   );
  // }

  // const { home, categories } = data;

  return <div></div>;
};

export async function getStaticProps({ params }) {
  // console.log("CURRENT PARAMS", params);
  // const { lang: locale } = params;

  // const response = await doQuery(queries.blogInde, { locale });
  // const { data } = response;
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
    props: {}
  };
}

export default BlogIndexPage;
