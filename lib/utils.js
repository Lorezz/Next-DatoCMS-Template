export default function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export const resolvePage = (link) => {
  //console.log(link.__typename)
  if (link?.slug && link.slug != 'home') {
    return `/${link.slug}`;
  }
  return `/`;
};

export const resolveInternalLink = ({ link }) => {
  const { slug, __typename } = link;
  let prefix = '/';

  switch (__typename) {
    case 'TagRecord':
      prefix = '/tags';
      break;
    case 'AuthorRecord':
      prefix = '/authors';
      break;
    case 'PostRecord':
      prefix = '/blog';
      break;
    default:
      break;
  }
  return `${prefix}${slug}`;
};

export const getLayoutData = (siteResponse, seo = []) => {
  const favicon = siteResponse?.data?.site?.favicon || [];
  const metatags = [...favicon, ...seo];
  return { ...siteResponse.data, metatags };
};
