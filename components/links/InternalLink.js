import Link from 'next/link';
import { Box, Avatar } from '@chakra-ui/react';

const InternalLink = ({ internalLink, title = null, preview = null }) => {
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

export default InternalLink;
