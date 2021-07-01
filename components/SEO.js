import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';

const SEO = ({ seo }) => {
  <Head>
    {renderMetaTags(seo)}
    {/* {post._firstPublishedAt && (
            <meta
              property="article:published_time"
              content={new Date(post._firstPublishedAt).toISOString()}
            />
          )} */}
  </Head>;
};

export default SEO;
