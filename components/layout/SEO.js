import Head from 'next/head';
import { renderMetaTags } from 'react-datocms';

const SEO = ({ tags, firstPublishedAt = null }) => {
  return (
    <Head>
      {renderMetaTags(tags)}
      {firstPublishedAt && (
        <meta
          property="article:published_time"
          content={new Date(firstPublishedAt).toISOString()}
        />
      )}
    </Head>
  );
};

export default SEO;
