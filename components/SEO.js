import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';

const SEO = ({ tags, firstPublishedAt = null }) => {
  <Head>
    {renderMetaTags(tags)}
    {firstPublishedAtt && (
      <meta
        property="article:published_time"
        content={new Date(firstPublishedAt).toISOString()}
      />
    )}
  </Head>;
};

export default SEO;
