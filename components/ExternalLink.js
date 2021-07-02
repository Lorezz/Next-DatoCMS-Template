// import Link from 'next/link';
import { Avatar } from '@chakra-ui/react';

const InternalLink = ({
  id,
  externalLinkUrl,
  title = null,
  preview = null
}) => {
  return (
    <a href={externalLinkUrl} target="_blank" key={id}>
      {preview && <Avatar name={title} src={preview?.url} />}
      {title}
    </a>
  );
};

export default InternalLink;
